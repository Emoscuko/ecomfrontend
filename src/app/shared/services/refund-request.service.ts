// src/app/shared/services/refund-request.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// src/app/shared/models/refund-request.model.ts
export interface RefundRequest {
    id: number;
    orderId: number;
    userId: number;
    reason: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    createdAt: string;
    adminComment?: string;
    decidedAt?: string;
  }
  
@Injectable({ providedIn: 'root' })
export class RefundRequestService {
  private api = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  create(orderId: number, reason: string): Observable<RefundRequest> {
    return this.http.post<RefundRequest>(
      `${this.api}/orders/${orderId}/refund-requests`,
      { reason }
    );
  }

  /** admin */
  list(status?: string): Observable<RefundRequest[]> {
    const q = status ? `?status=${status}` : '';
    return this.http.get<RefundRequest[]>(`${this.api}/admin/refund-requests${q}`);
  }

  decide(id: number, accept: boolean, comment?: string) {
    return this.http.patch<RefundRequest>(
      `${this.api}/admin/refund-requests/${id}`,
      { accept, comment }
    );
  }
}
