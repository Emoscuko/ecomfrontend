// src/app/shared/services/seller-dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface DashboardSummary {
  products: number;
  pendingOrders: number;
  totalSales: number;
}

@Injectable({ providedIn: 'root' })
export class SellerDashboardService {
  private api = `${environment.apiBaseUrl}/seller/dashboard`;
  constructor(private http: HttpClient) {}
  getSummary(): Observable<DashboardSummary> { return this.http.get<DashboardSummary>(this.api); }
}
