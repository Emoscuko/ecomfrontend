import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private api = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  list(productId: number) {
    return this.http.get<Review[]>(`${this.api}/${productId}/reviews`);
  }

  add(productId: number, rating: number, comment: string) {
    return this.http.post<Review>(
      `${this.api}/${productId}/reviews`,
      { rating, comment }
    );
  }

  delete(productId: number, reviewId: number) {
    return this.http.delete(`${this.api}/${productId}/reviews/${reviewId}`);
  }
}
