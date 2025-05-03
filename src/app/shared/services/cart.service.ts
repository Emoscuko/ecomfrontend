// src/app/shared/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem { product: Product; quantity: number; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  getItems() {
    return this.cartItems$.asObservable();
  }

  addItem(product: Product, quantity: number = 1): void {
    const current = this.cartItems$.value;
    const existingIndex = current.findIndex(item => item.product.id === product.id);
    if (existingIndex >= 0) {
      // If product already in cart, increase quantity
      current[existingIndex].quantity += quantity;
    } else {
      current.push({ product, quantity });
    }
    this.cartItems$.next(current);
  }

  updateQuantity(productId: number, quantity: number): void {
    const current = this.cartItems$.value;
    const item = current.find(ci => ci.product.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        // remove item if quantity zero
        this.removeItem(productId);
      } else {
        this.cartItems$.next(current);
      }
    }
  }

  removeItem(productId: number): void {
    let current = this.cartItems$.value;
    current = current.filter(ci => ci.product.id !== productId);
    this.cartItems$.next(current);
  }

  clearCart(): void {
    this.cartItems$.next([]);
  }

  getTotal(): number {
    return this.cartItems$.value
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}
