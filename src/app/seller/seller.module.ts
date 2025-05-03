import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerLayoutComponent } from './components/seller-layout/seller-layout.component';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { SellerOrderListComponent } from './components/seller-order-list/seller-order-list.component';
import { SellerProductFormComponent } from './components/seller-product-form/seller-product-form.component';
import { SellerProductListComponent } from './components/seller-product-list/seller-product-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SellerRoutingModule } from './seller-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    SellerLayoutComponent, 
    SellerDashboardComponent, 
    SellerOrderListComponent, 
    SellerProductFormComponent,
    SellerProductListComponent
    ],

  imports: [  
    CommonModule,
    SellerRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormField,
  ]
})
export class SellerModule { }
