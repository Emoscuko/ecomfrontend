// src/app/shop/components/order-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService, Order } from '../../../shared/services/order.service';
import { RefundRequestDialogComponent } from '../refund-request-dialog/refund-request-dialog.component';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  standalone: false,
})
export class OrderDetailComponent implements OnInit {
  order?: Order;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.orderService.getOrderById(id).subscribe({
      next: o => (this.order = o),
      complete: () => (this.loading = false),
    });
  }

  /** opens modal, then POSTs refund if user confirmed */
  requestRefund(): void {
    if (!this.order) return;
    const ref = this.dialog.open(RefundRequestDialogComponent, {
      width: '420px',
      data: { orderId: this.order.id },
    });
    ref.afterClosed().subscribe(reason => {
      if (reason) {
        // RefundRequestService is injected inside the dialog, so nothing else to do here
        this.order!.status = 'REFUND_PENDING'; // optimistic UI
      }
    });
  }
}
