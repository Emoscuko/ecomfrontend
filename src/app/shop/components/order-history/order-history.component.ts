// src/app/shop/components/order-history.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService, Order } from '../../../shared/services/order.service';
import { RefundRequestDialogComponent } from '../refund-request-dialog/refund-request-dialog.component';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  standalone: false
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  expanded = new Set<number>();

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog
  ) {}

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

  /** Navigate to the standalone detail page */
  viewDetail(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }

  /** Open refund dialog */
  requestRefund(order: Order) {
    const ref = this.dialog.open(RefundRequestDialogComponent, {
      width: '420px',
      data: { orderId: order.id }
    });
    ref.afterClosed().subscribe(reason => {
      if (reason) {
        // optimistic update
        order.status = 'REFUND_PENDING';
      }
    });
  }
}
