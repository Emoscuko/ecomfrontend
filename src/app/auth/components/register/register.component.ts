// src/app/auth/components/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;
  successMessage: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    const { name, email, password } = this.registerForm.value!;
    this.authService.register(name!, email!, password!).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = "Registration successful! Redirecting to login...";
        // Auto-navigate to login after short delay
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
