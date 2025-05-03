import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environments/environment";
/** Simple view-model for an order row shown on the Seller dashboard. */
export interface SellerOrderItemDto {
  id: number;
  orderDate: string;
  quantity: number;
  price: number;
  productName: string;
  orderStatus: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  buyerEmail: string;
}

// src/app/seller/components/seller-order-list.component.ts
@Component({
  selector: 'app-seller-order-list',
  standalone: false,
  template: `
  <h1 class="text-xl font-bold my-4">Orders for My Products</h1>
  <table mat-table [dataSource]="orders" class="w-full">

    <ng-container matColumnDef="productName">
      <th mat-header-cell *matHeaderCellDef> Product </th>
      <td mat-cell *matCellDef="let element"> {{element.productName}} </td>
    </ng-container>

    <ng-container matColumnDef="quantity">
      <th mat-header-cell *matHeaderCellDef> Quantity </th>
      <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
    </ng-container>
    <ng-container matColumnDef="price">
      <th mat-header-cell *matHeaderCellDef> Price </th>
      <td mat-cell *matCellDef="let element"> {{element.price | currency}} </td>
    </ng-container>
    <ng-container matColumnDef="orderDate">
      <th mat-header-cell *matHeaderCellDef> Order Date </th>
      <td mat-cell *matCellDef="let element"> {{element.orderDate | date}} </td>
    </ng-container>
    <ng-container matColumnDef="orderStatus">
      <th mat-header-cell *matHeaderCellDef> Order Status </th>
      <td mat-cell *matCellDef="let element"> {{element.orderStatus}} </td>
    </ng-container>
    <ng-container matColumnDef="buyerEmail">
      <th mat-header-cell *matHeaderCellDef> Buyer </th>
      <td mat-cell *matCellDef="let element"> {{element.buyerEmail}} </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="[ 'productName', 'quantity', 'price', 'orderDate', 'orderStatus','buyerEmail']"></tr>
    <tr mat-row *matRowDef="let row; columns: [ 'productName', 'quantity', 'price', 'orderDate', 'orderStatus','buyerEmail'];"></tr>
  </table>

   `,
})
export class SellerOrderListComponent implements OnInit {
  orders: SellerOrderItemDto[] = [];
  columnsToDisplay = [ 'productName', 'quantity', 'price', 'orderDate', 'orderStatus', 'buyerEmail'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<SellerOrderItemDto[]>(`${environment.apiBaseUrl}/seller/orders`)
      .subscribe(data => {
        this.orders = data;
      });
  }
}


