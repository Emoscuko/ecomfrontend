// src/app/shared/services/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Address } from './address.service';

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    addresses: Address[];
  }
  
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private api = `${environment.apiBaseUrl}/profile`;
  constructor(private http: HttpClient) {}

  me() { return this.http.get<UserProfile>(this.api); }
}
