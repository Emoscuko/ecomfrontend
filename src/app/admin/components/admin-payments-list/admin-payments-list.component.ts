import { Component, OnInit } from '@angular/core';
import { PaymentService, Payment } from '../../../shared/services/payment.service';

@Component({
  selector: 'app-admin-payments-list',
  templateUrl: './admin-payments-list.component.html',
  standalone: false,
})
export class AdminPaymentsListComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns = ['id', 'userId', 'order', 'amount', 'currency', 'status', 'createdAt'];

  constructor(private paymentSvc: PaymentService) {}

  ngOnInit() {
    this.paymentSvc.getAllPayments().subscribe(data => this.payments = data);
  }
}
