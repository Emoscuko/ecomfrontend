// src/app/seller/components/seller-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SellerDashboardService, DashboardSummary } from '../../../shared/services/seller-dashboard.service';

@Component({
  selector: 'app-seller-dashboard',
  template: `
  <h1 class="mb-4 text-2xl font-semibold">Seller Dashboard</h1>
  
  <div class="grid gap-4 md:grid-cols-3">
    
    <mat-card class="p-4 text-center">
      <h2 class="text-lg font-medium">My Products</h2>
      <p class="text-3xl">{{data?.products ?? '…'}}</p>
    </mat-card>

    <mat-card class="p-4 text-center">
      <h2 class="text-lg font-medium">Pending Orders</h2>
      <p class="text-3xl">{{data?.pendingOrders ?? '…'}}</p>
    </mat-card>

    <mat-card class="p-4 text-center">
      <h2 class="text-lg font-medium">Total Sales</h2>
      <p class="text-3xl">{{data?.totalSales | currency:'USD' : 'symbol' : '1.0-0' : 'en'}}</p>
    </mat-card>
  </div>
  `,
  standalone: false,
})
export class SellerDashboardComponent implements OnInit {
  data?: DashboardSummary;
  constructor(private svc: SellerDashboardService) {}
  ngOnInit() { this.svc.getSummary().subscribe(d => this.data = d); }
}
