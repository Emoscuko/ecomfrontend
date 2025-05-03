// src/app/auth/components/login.component.ts
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // If already logged in, redirect (to shop or admin)
    if (this.authService.isLoggedIn()) {
      this.router.navigate([ this.authService.isAdmin() ? '/admin' : '/' ]);
    }
    
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = null;
    const { email, password } = this.loginForm.value!;
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.loading = false;
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']); // shop home
        }
      },
      error: err => {
        this.loading = false;
        // Handle error (e.g., invalid credentials)
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}
