import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminCategoryListComponent } from './components/admin-category-list/admin-category-list.component';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminSellerRequestsComponent } from './components/admin-seller-requests/admin-seller-requests.component';
import { AdminPaymentsListComponent } from './components/admin-payments-list/admin-payments-list.component';
import { RefundRequestsListComponent } from './refund-requests-list/refund-requests-list.component';

const routes: Routes = [
  { path: '', component: AdminLayoutComponent, canActivate: [AdminGuard], 
    children: [
      { path: 'seller-requests', component: AdminSellerRequestsComponent },
      { path: '', component: AdminDashboardComponent },
      { path: 'products', component: AdminProductListComponent },
      { path: 'products/new', component: AdminProductFormComponent },
      { path: 'products/:id', component: AdminProductFormComponent },
      { path: 'categories', component: AdminCategoryListComponent },
      { path: 'orders', component: AdminOrderListComponent },
      { path: 'users', component: AdminUserListComponent },
      { path: 'payments', component: AdminPaymentsListComponent },
      { path: 'refund-requests', component: RefundRequestsListComponent },

    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
