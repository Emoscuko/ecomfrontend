import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

// src/app/shared/services/category.service.ts
export interface Category {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = `${environment.apiBaseUrl}/categories`;
  private apiAdmin = `${environment.apiBaseUrl}/admin/categories`;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(this.api);
  }
  create(category: { name: string, description?: string }) {
    return this.http.post<Category>(this.apiAdmin, category);
  }
  update(id: number, category: { name: string , description?: string }) {
    return this.http.put<Category>(`${this.apiAdmin}/${id}`, category);
  }
  delete(id: number) {
    return this.http.delete(`${this.apiAdmin}/${id}`);
  }
}
