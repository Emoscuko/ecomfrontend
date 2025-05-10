// src/app/shared/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CartService } from './cart.service';

export interface Order {
  id: number;
  items: { quantity:number, price:number, product:{ name:string } }[];
  totalAmount: number;
  status: string;
  orderDate: string;
  user: {email:string}
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiBaseUrl}/orders`;
  constructor(private http: HttpClient, private cartService: CartService) {}

  /** Place a new order for the current user using cart items */
  placeOrder(addressId: number) {
    // We might need to send cart items to backend. Let's gather items:
    const items = this.cartService['cartItems$'].value.map(ci => ({
      
      productId: ci.product.id,
      quantity: ci.quantity
    }));
    return this.http.post<Order>(`${this.api}`, { addressId, items });
  }
  getOrderById(id: number) {
       return this.http.get<Order>(`${this.api}/${id}`);
     }
  /** Get orders for current logged-in user */
  getMyOrders() {
    return this.http.get<Order[]>(`${this.api}`);
  }

  /** ADMIN: get all orders */
  getAllOrders() {
    return this.http.get<Order[]>(`${environment.apiBaseUrl}/admin/orders`);
  }

  updateOrderStatus(orderId: number, status: string) {
    // build ?status=... query param
    const params = new HttpParams().set('status', status);
    return this.http.put<Order>(
      `${environment.apiBaseUrl}/admin/orders/${orderId}`,
      null,      // no body
      { params } // query-param on the URL
    );
  }
}
