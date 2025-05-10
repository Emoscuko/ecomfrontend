// src/app/shared/services/product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from './category.service';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: Category;
  sellerId: number;
  categoryName?: string;
  active: boolean;               // ← include the active flag
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api       = `${environment.apiBaseUrl}/products`;
  private apiAdmin  = `${environment.apiBaseUrl}/admin/products`;
  private apiSeller = `${environment.apiBaseUrl}/seller/products`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(this.api);
  }

  getById(productId: number) {
    return this.http.get<Product>(`${this.api}/${productId}`);
  }

  getByCategory(categoryId: number) {
    return this.http.get<Product[]>(`${this.api}?category=${categoryId}`);
  }

  /** Admin operations */
  getAllAdmin() {
    return this.http.get<Product[]>(this.apiAdmin);
  }

  create(product: Partial<Product>) {
    return this.http.post<Product>(this.apiAdmin, product);
  }
  update(productId: number, product: Partial<Product>) {
    return this.http.put<Product>(`${this.apiAdmin}/${productId}`, product);
  }
  delete(productId: number) {
    return this.http.delete(`${this.apiAdmin}/${productId}`);
  }
  activate(productId: number) {
    return this.http.put<Product>(`${this.apiAdmin}/${productId}/activate`, {});
  }

  /** Seller operations */
  getMine() {
    return this.http.get<Product[]>(`${this.apiSeller}`);
  }
  createForSeller(data: Partial<Product>) {
    return this.http.post<Product>(this.apiSeller, data);
  }
  updateForSeller(id: number, data: Partial<Product>) {
    return this.http.put<Product>(`${this.apiSeller}/${id}`, data);
  }
  deleteForSeller(id: number) {
    return this.http.delete(`${this.apiSeller}/${id}`);
  }
}
