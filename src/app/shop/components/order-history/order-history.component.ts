// src/app/shop/components/order-history.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  standalone: false
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  // keep track of which orders are expanded:
  expanded = new Set<number>();

  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.loading = true;
    this.orderService.getMyOrders().subscribe({
      next: o => { this.orders = o; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  toggle(orderId: number) {
    if (this.expanded.has(orderId)) {
      this.expanded.delete(orderId);
    } else {
      this.expanded.add(orderId);
    }
  }

  isExpanded(orderId: number) {
    return this.expanded.has(orderId);
  }
}