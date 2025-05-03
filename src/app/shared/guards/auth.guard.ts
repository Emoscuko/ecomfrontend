// src/app/shared/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.auth.isLoggedIn()) return true;
    // If not logged in, redirect to login
    return this.router.createUrlTree(['/auth/login']);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    // Prevent lazy module loading if not logged in
    return this.auth.isLoggedIn();
  }
}

