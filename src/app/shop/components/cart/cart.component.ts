// src/app/shop/components/cart.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  total = 0;
  private sub!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to cart items stream
    this.sub = this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updateQuantity(item: CartItem, qty: number): void {
    this.cartService.updateQuantity(item.product.id, qty);
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.product.id);
  }

  checkout(): void {
    // If user not logged in, AuthGuard will redirect to login automatically when navigating to /checkout
    this.router.navigate(['/checkout']);
  }
}
