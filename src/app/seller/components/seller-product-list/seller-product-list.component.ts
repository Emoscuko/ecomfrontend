import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../../../shared/services/product.service";
import { SellerProductService } from "../../../shared/services/seller-product.service";

// src/app/seller/components/seller-product-list.component.ts
@Component({
  selector: 'app-seller-product-list',
  standalone: false,
  template: `
  <h1>My Products</h1>
  <button mat-flat-button color="primary" (click)="add()">Add Product</button>

  <table mat-table [dataSource]="products">
    <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef>ID</th>
      <td mat-cell *matCellDef="let p">{{p.id}}</td></ng-container>

    <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let p">{{p.name}}</td></ng-container>

    <ng-container matColumnDef="price"><th mat-header-cell *matHeaderCellDef>Price</th>
      <td mat-cell *matCellDef="let p">{{p.price | currency}}</td></ng-container>

    <ng-container matColumnDef="stock"><th mat-header-cell *matHeaderCellDef>Stock</th>
      <td mat-cell *matCellDef="let p">{{p.stock}}</td></ng-container>

    <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th>
    
      <td mat-cell *matCellDef="let p">
        <button mat-icon-button color="primary" (click)="edit(p)"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button color="warn" (click)="del(p)"><mat-icon>delete</mat-icon></button>
      </td></ng-container>

    <tr mat-header-row *matHeaderRowDef="cols"></tr>
    <tr mat-row *matRowDef="let row; columns: cols;"></tr>
  </table>`,
})
export class SellerProductListComponent implements OnInit {
  products: Product[] = []; cols = ['id','name','price','stock','actions'];
  constructor(private svc: SellerProductService, private router: Router) {}
  ngOnInit() { this.refresh(); }
  refresh(){ this.svc.list().subscribe(p=>this.products=p); }
  add(){ this.router.navigate(['seller','products','new']); }
  edit(p:Product){ this.router.navigate(['seller','products',p.id]); }
  del(p:Product){ if(confirm('Delete?')) this.svc.delete(p.id).subscribe(()=>this.refresh()); }
}
