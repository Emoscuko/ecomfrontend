// src/app/shared/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private auth: AuthService, private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized (maybe expired token)
        if (error.status === 401) {
          {
            // If refresh not possible, log out and redirect
            this.auth.logout();
            this.snackBar.open('Unauthorized. Please log in.', 'OK', { duration: 5000 });
          }
        }
        // Handle 403 Forbidden
        if (error.status === 403) {
          this.snackBar.open('Access denied.', 'OK', { duration: 5000 });
        }
        // Handle other errors (network, server errors)
        if (error.status === 0) {
          // Network error or CORS issue
          this.snackBar.open('Network error. Please check your connection.', 'OK', { duration: 5000 });
        } else if (error.status >= 500) {
          this.snackBar.open('Server error. Please try again later.', 'OK', { duration: 5000 });
        }
        return throwError(error);
      })
    );
  }
}
