import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Product } from "./product.service";

// src/app/shared/services/seller-product.service.ts
@Injectable({ providedIn: 'root' })
export class SellerProductService {
  private api = `${environment.apiBaseUrl}/seller/products`;
  constructor(private http: HttpClient) {}

  list()                 { return this.http.get<Product[]>(this.api); }
  create(data: any)      { return this.http.post<Product>(this.api, data); }
  update(id: number, d: Product)  { return this.http.put<Product>(`${this.api}/${id}`, d); }
  delete(id: number)     { return this.http.delete(`${this.api}/${id}`); }
  getById(id:number)     { return this.http.get<Product>(`${this.api}/${id}`); }
}
