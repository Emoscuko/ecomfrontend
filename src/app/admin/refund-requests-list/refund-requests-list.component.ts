// src/app/admin/components/refund-requests-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RefundRequestService,RefundRequest } from '../../shared/services/refund-request.service';


@Component({
  selector: 'app-refund-requests-list',
  templateUrl: './refund-requests-list.component.html',
  standalone: false,
})
export class RefundRequestsListComponent implements OnInit {
  displayedColumns = ['id', 'order', 'user', 'reason', 'status', 'actions'];
  data: RefundRequest[] = [];
  loading = false;

  constructor(private refundSvc: RefundRequestService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.refundSvc.list().subscribe({
      next: d => (this.data = d),
      complete: () => (this.loading = false),
    });
  }

  decide(r: RefundRequest, accept: boolean): void {
    this.refundSvc.decide(r.id, accept).subscribe(() => this.fetch());
  }
}
