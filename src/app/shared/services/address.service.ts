// src/app/shared/services/address.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// src/app/shared/models/address.model.ts
export interface Address {
    id?: number;
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  
@Injectable({ providedIn: 'root' })
export class AddressService {
  private api = `${environment.apiBaseUrl}/addresses`;
  constructor(private http: HttpClient) {}

  list()        { return this.http.get<Address[]>(this.api); }
  add(addr: Address)   { return this.http.post<Address>(this.api, addr); }
  update(a: Address)   { return this.http.put<Address>(`${this.api}/${a.id}`, a); }
  delete(id: number)   { return this.http.delete(`${this.api}/${id}`); }
}
