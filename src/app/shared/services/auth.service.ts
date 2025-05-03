import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

interface AuthResponse { token: string; }
interface JwtPayload { sub: string; role: string; exp: number; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private logoutTimer?: ReturnType<typeof setTimeout>;

  userRole = '';
  tokenExpMs = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/auth/login`, { email, password })
      .pipe(tap(res => this.saveToken(res.token)));
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${environment.apiBaseUrl}/auth/register`, { name, email, password });
  }

  /* ------------ token helpers ------------ */

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.decodeToken(token);
    this.scheduleAutoLogout();
  }
  
  private scheduleAutoLogout(): void {
    clearTimeout(this.logoutTimer as any);
    const msUntilExpiry = this.tokenExpMs - Date.now();
    if (msUntilExpiry > 0) {
      this.logoutTimer = setTimeout(() => this.logout(), msUntilExpiry);
    } else {
      this.logout();
    }
  }
  

  private decodeToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload;
      this.userRole = payload.role;
      this.tokenExpMs = payload.exp * 1000;
    } catch {
      console.error('Invalid JWT token');
      this.userRole = '';
      this.tokenExpMs = 0;
    }
  }

 

  /* ------------ public API ------------ */

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && Date.now() < this.tokenExpMs;
  }

  isAdmin(): boolean { return this.isLoggedIn() && this.userRole === 'ADMIN'; }
  isSeller(): boolean { return this.isLoggedIn() && this.userRole === 'SELLER'; }

  getToken() { return localStorage.getItem(this.tokenKey); }

  logout(silent = false) {
    localStorage.removeItem(this.tokenKey);
    this.userRole = '';
    this.tokenExpMs = 0;
    clearTimeout(this.logoutTimer as any);
    if (!silent) this.router.navigate(['/auth/login']);
  }

  /* call in app.component.ts -> ngOnInit to refresh timer on hard reload */
  refreshSessionTimer() {
    if (this.isLoggedIn()) this.scheduleAutoLogout();
  }
  loadToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.decodeToken(token);
    }
  }
}

  
