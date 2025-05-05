import { loadStripe, Stripe, StripeCardElement, StripeError } from '@stripe/stripe-js';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CartItem, CartService } from '../../../shared/services/cart.service';
import { PaymentService } from '../../../shared/services/payment.service';
import { firstValueFrom } from 'rxjs';
import { Address, AddressService } from '../../../shared/services/address.service';

interface OrderRequest {
  paymentIntentId: string;
  addressId: number;
  items: { productId: number; quantity: number }[];
}
interface OrderResponse {
  id: number;
  // … other fields if needed
}

@Component({
  selector: 'app-checkout',
  standalone: false,
  template: `
  <mat-form-field appearance="fill" *ngIf="addresses.length">
  <mat-label>Shipping address</mat-label>
  <mat-select [(ngModel)]="selectedAddressId">
    <mat-option *ngFor="let a of addresses" [value]="a.id">
      {{ a.street }}, {{ a.city }} ({{ a.zip }})
    </mat-option>
  </mat-select>
</mat-form-field>

    <form (submit)="pay($event)">
      <div id="card-element"></div>
      <button mat-raised-button color="primary" [disabled]="loading">
        Pay {{ total | currency:'EUR' }}
      </button>
      <mat-error *ngIf="error">{{ error }}</mat-error>
    </form>
  `,
})
export class CheckoutComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddressId!: number;
  private cartItems: CartItem[] = [];
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
    private addressService: AddressService
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

  /** Main payment flow */
  async pay(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.error = '';

    try {
      // 1️⃣ Create the Order on your backend
      const orderReq = {
        items: this.cartItems.map(ci => ({
          productId: ci.product.id,
          quantity: ci.quantity
        }))
      };
      const order = await firstValueFrom(
        this.http.post<OrderResponse>(
          `${environment.apiBaseUrl}/orders`,
          orderReq
        )
      );

      // 2️⃣ Create Stripe PaymentIntent, passing the new order ID
      const cents = Math.round(this.total * 100);
      const { clientSecret } = await firstValueFrom(
        this.payment.createStripePaymentIntent(cents, order.id)
      );

      // 3️⃣ Confirm card payment as before
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        clientSecret,
        { payment_method: { card: this.card } }
      );

      if (error) {
        this.error = this.mapError(error);
        return;
      }

      if (paymentIntent!.status === 'succeeded') {
        // 4️⃣ (Optional) patch your Order with the paymentIntentId, if needed:
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
