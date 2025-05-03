import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CompareComponent } from './components/compare/compare.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },                  // home page: product listing
  { path: 'product/:id', component: ProductDetailComponent },     // product details page
  { path: 'cart', component: CartComponent },                     // shopping cart
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] }, // checkout (requires login)
  { path: 'orders', component: OrderHistoryComponent, canActivate: [AuthGuard] }, // order history (requires login)
  { path: 'compare', component: CompareComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
