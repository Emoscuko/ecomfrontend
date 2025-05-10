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

  addItem(product: Product, quantity = 1): void {                 // ► ①
    const current = [...this.cartItems$.value];                   // copy for immutability
    const idx = current.findIndex(ci => ci.product.id === product.id);
    const existingQty = idx >= 0 ? current[idx].quantity : 0;
    const desiredQty  = existingQty + quantity;
  
    if (desiredQty > product.stock) {                             // guard
      alert(`Only ${product.stock} left in stock.`);
      return;
    }
  
    if (idx >= 0) current[idx].quantity = desiredQty;
    else           current.push({ product, quantity });
  
    this.cartItems$.next(current);
  }
  
  updateQuantity(productId: number, quantity: number): void {     // ► ②
    const current = [...this.cartItems$.value];
    const item = current.find(ci => ci.product.id === productId);
    if (!item) return;
  
    if (quantity > item.product.stock) {
      alert(`Only ${item.product.stock} left in stock.`);
      return;
    }
  
    item.quantity = quantity;
    if (item.quantity <= 0) this.removeItem(productId);
    else                    this.cartItems$.next(current);
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
