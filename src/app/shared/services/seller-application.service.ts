// src/app/shared/services/seller-application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface SellerApplication {
  id: number; status: 'PENDING'|'APPROVED'|'REJECTED'; createdAt: string; note: string;
  user: { id: number; name: string; email: string; };
}

@Injectable({ providedIn: 'root' })
export class SellerApplicationService {
  private api = `${environment.apiBaseUrl}/seller-applications`;
  private adminApi = `${environment.apiBaseUrl}/admin/seller-applications`;
  constructor(private http: HttpClient) {}

  apply(note: string) { return this.http.post<SellerApplication>(this.api, { note }); }

  listPending(): Observable<SellerApplication[]> { return this.http.get<SellerApplication[]>(this.adminApi); }

  approve(id: number) { return this.http.put(`${this.adminApi}/${id}/approve`, {}); }

  reject(id: number)  { return this.http.put(`${this.adminApi}/${id}/reject`,  {}); }
}
