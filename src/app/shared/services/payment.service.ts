// src/app/shared/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export interface PaymentIntentResponse {
  clientSecret: string;
}
export interface Payment {
  id: number;
  userId: number;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: string;
  order: { id: number };
}
@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  getStripePublicKey(): string {
    return environment.stripePublicKey;
  }

  /** Call backend to create a Stripe PaymentIntent for the given amount (in smallest currency unit) */
  createStripePaymentIntent(amount: number, orderId: number) {
    return this.http.post<PaymentIntentResponse>(
      `${environment.apiBaseUrl}/payment/create-payment-intent`,
      { amount, orderId }
    );
  }

  getAllPayments() {
    return this.http.get<Payment[]>(
      `${environment.apiBaseUrl}/admin/payments`
    );
  }

  /** Initiate PayPal checkout (this could return a PayPal approval URL or handle via PayPal JS SDK) */
  startPayPalCheckout(amount: number) {
    // This might call backend to create a PayPal order and return an approval link,
    // or we could rely on PayPal JS SDK (not fully implemented here).
    return this.http.post(`${environment.apiBaseUrl}/payments/paypal/create`, { amount });
  }
  
}
