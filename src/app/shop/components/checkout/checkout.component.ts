import { loadStripe, Stripe, StripeCardElement, StripeError } from '@stripe/stripe-js';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CartItem, CartService } from '../../../shared/services/cart.service';
import { PaymentService } from '../../../shared/services/payment.service';
import { firstValueFrom } from 'rxjs';
import { Address, AddressService } from '../../../shared/services/address.service';
import { OrderService, Order } from '../../../shared/services/order.service';

interface OrderResponse extends Order {}

@Component({
  selector: 'app-checkout',
  standalone: false,
  template: `
    <mat-card class="checkout-card">
      <mat-card-header>
        <mat-card-title>Checkout</mat-card-title>
      </mat-card-header>
      <mat-divider></mat-divider>
      <mat-card-content>
        <div class="checkout-grid">
          <!-- Left: Payment & Address -->
          <div class="checkout-form">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Shipping address</mat-label>
              <mat-select [(ngModel)]="selectedAddressId">
                <mat-option *ngFor="let a of addresses" [value]="a.id">
                  {{ a.street }}, {{ a.city }} {{ a.zip }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <div id="card-element" class="card-element"></div>
            <mat-error *ngIf="error">{{ error }}</mat-error>

            <form (submit)="pay($event)">
      <div id="card-element"></div>
      <button mat-raised-button color="primary" [disabled]="loading">
        Pay {{ total | currency:'EUR' }}
      </button>
      <mat-error *ngIf="error">{{ error }}</mat-error>
    </form>
          </div>

          <!-- Right: Order Summary -->
          <div class="order-summary">
            <h3>Order Summary</h3>
            <mat-list>
              <mat-list-item *ngFor="let item of cartItems">
                <span>{{ item.product.name }} x {{ item.quantity }}</span>
                <span class="item-price">{{ (item.product.price * item.quantity) | currency:'EUR' }}</span>
              </mat-list-item>
            </mat-list>
            <mat-divider></mat-divider>
            <div class="summary-total">
              <span>Total:</span>
              <span class="total-price">{{ total | currency:'EUR' }}</span>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
 
 styles: [
  `
  .checkout-card { max-width: 800px; margin: 2rem auto; }
  .checkout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
  .full-width { width: 100%; }
  .card-element { padding: 1rem 0; }
  .pay-button { margin-top: 1rem; width: 100%; }
  .order-summary { }
  .item-price { margin-left: auto; }
  .summary-total { display: flex; justify-content: space-between; font-weight: bold; margin-top: 1rem; }
  @media (max-width: 600px) {
    .checkout-grid { grid-template-columns: 1fr; }
  }
  `
]
})
export class CheckoutComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddressId!: number;
   cartItems: CartItem[] = [];
  private stripe!: Stripe;
  private card!: StripeCardElement;

  total = 0;
  loading = false;
  error = '';

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private payment: PaymentService,
    private router: Router,
    private addressService: AddressService,
    private orderService: OrderService // ⬅︎ NEW: use the typed OrderService
  ) {}

  async ngOnInit() {
    const stripeInstance = await loadStripe(environment.stripePublicKey);
    if (!stripeInstance) throw new Error('Stripe failed to load.');
    this.stripe = stripeInstance;
    this.card = this.stripe.elements().create('card');
    this.card.mount('#card-element');

    this.cart.getItems().subscribe(items => {
      this.cartItems = items;
      this.total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    });

    this.addressService.list().subscribe(a => {
      this.addresses = a;
      if (a.length) this.selectedAddressId = a[0].id!;
    });
  }

  /** Main checkout flow */
  async pay(e: Event) {
    e.preventDefault();
    if (!this.selectedAddressId) {
      this.error = 'Please choose a shipping address.';
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      // 1️⃣ Create the Order (now via OrderService) -------------
      const order = await firstValueFrom(
        this.orderService.placeOrder(this.selectedAddressId)
      );

      // 2️⃣ Create Stripe PaymentIntent -------------------------
      const cents = Math.round(this.total * 100);
      const { clientSecret } = await firstValueFrom(
        this.payment.createStripePaymentIntent(cents, order.id)
      );

      // 3️⃣ Confirm card payment -------------------------------
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        { payment_method: { card: this.card } }
      );

      if (error) {
        this.error = this.mapError(error);
        return;
      }

      if (paymentIntent!.status === 'succeeded') {
        // 4️⃣ Patch Order with paymentIntentId -----------------
        await firstValueFrom(
          this.http.patch(
            `${environment.apiBaseUrl}/orders/${order.id}`,
            { paymentIntentId: paymentIntent!.id }
          )
        );

        this.cart.clearCart();
        await this.router.navigate(['/orders']);
      }
    } catch (err: any) {
      this.error = err.message || 'Payment failed';
    } finally {
      this.loading = false;
    }
  }

  private mapError(err: StripeError | undefined): string {
    if (!err) return 'Unknown error';
    const map: Record<string, string> = {
      card_declined: 'Your card was declined.',
      expired_card: 'Your card has expired.',
      incorrect_cvc: 'The CVC code is incorrect.',
      processing_error: 'The payment processor had a temporary issue.',
    };
    return map[err.code!] ?? err.message ?? 'Payment failed.';
  }
}
