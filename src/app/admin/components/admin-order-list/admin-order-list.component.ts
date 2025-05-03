// src/app/admin/components/admin-order-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from '../../../shared/services/order.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  standalone: false,
})
export class AdminOrderListComponent implements OnInit {
  orders: Order[] = [];
  statusOptions: string[] = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: orders => { this.orders = orders; this.loading = false; },
      error: () => { this.loading = false; /* handle error */ }
    });
  }

  updateStatus(order: Order, status: string): void {
    this.orderService.updateOrderStatus(order.id, status).subscribe({
      next: () => order.status = status  // update local status on success
    });
  }
}
