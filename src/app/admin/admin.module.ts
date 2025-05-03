import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
// Angular Material components used in admin pages
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminCategoryListComponent } from './components/admin-category-list/admin-category-list.component';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { MatInputModule } from '@angular/material/input';
import { AdminSellerRequestsComponent } from './components/admin-seller-requests/admin-seller-requests.component';
import { AdminPaymentsListComponent } from './components/admin-payments-list/admin-payments-list.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminProductListComponent,
    AdminProductFormComponent,
    AdminCategoryListComponent,
    AdminOrderListComponent,
    AdminUserListComponent,
    AdminPaymentsListComponent,
    AdminSellerRequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule,
    MatToolbarModule, MatListModule, MatCardModule, MatTableModule,
    MatSelectModule, MatButtonModule, MatIconModule,MatOptionModule,
    MatFormFieldModule,MatInputModule
  ]
})
export class AdminModule {}
