// src/app/shared/guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class SellerGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.isSeller()) {
      return true;
    } else {
      // If user is not an seller, redirect to home (or could redirect to an access-denied page)
      alert('Access denied: Sellers only');
      return this.router.createUrlTree(['/']);
    }
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.auth.isSeller();
  }
}
