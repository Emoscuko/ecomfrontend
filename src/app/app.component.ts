import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app3';
  loading: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Restart the auto-logout timer if a valid token exists
    this.authService.refreshSessionTimer();
  }
}
