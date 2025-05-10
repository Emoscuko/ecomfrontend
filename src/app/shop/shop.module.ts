import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
// Angular Material components used in shop
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ApplyForSellerComponent } from './components/apply-for-seller/apply-for-seller.component';
import { ReviewComponent } from './components/review/review.component';
import { CompareComponent } from './components/compare/compare.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RefundRequestDialogComponent } from './components/refund-request-dialog/refund-request-dialog.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ProductListComponent,
     ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    CompareComponent, 
    OrderHistoryComponent, 
    ApplyForSellerComponent,
    ReviewComponent,
    RefundRequestDialogComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopRoutingModule,
    SharedModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule, MatButtonModule, MatSelectModule, MatInputModule, MatIconModule
  ]
})
export class ShopModule {}
