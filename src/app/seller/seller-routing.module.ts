import { NgModule } from '@angular/core';
import { SellerDashboardComponent } from './components/seller-dashboard/seller-dashboard.component';
import { SellerLayoutComponent } from './components/seller-layout/seller-layout.component';
import { SellerProductListComponent } from './components/seller-product-list/seller-product-list.component';
import { SellerProductFormComponent } from './components/seller-product-form/seller-product-form.component';
import { SellerOrderListComponent } from './components/seller-order-list/seller-order-list.component';
import { SellerGuard } from '../shared/guards/seller.guard';
import { RouterModule } from '@angular/router';

const routes = [{ path: '', component: SellerLayoutComponent, canActivate: [SellerGuard], 
    children: [
      { path: '', component: SellerDashboardComponent },
      { path: 'products', component: SellerProductListComponent },
      { path: 'products/new', component: SellerProductFormComponent },
      { path: 'products/:id', component: SellerProductFormComponent },
      { path: 'orders', component: SellerOrderListComponent },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class SellerRoutingModule {
  
 }
