import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  // Default path: load Shop module (storefront)
  { path: '', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) },
  // Auth module (login/registration pages)
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  // Admin module (protected by guards)
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard, AdminGuard],    // prevent loading module if not authorized
    canActivate: [AuthGuard, AdminGuard] // also guard navigation
  },
  { path: 'seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
    canLoad:    [AuthGuard],            // optionally SellerGuard here
    canActivate:[AuthGuard] },
  
  // Fallback for any unknown route
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
