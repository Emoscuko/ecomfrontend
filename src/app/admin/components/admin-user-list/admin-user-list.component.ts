// src/app/admin/components/admin-user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../shared/services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  standalone: false,
})
export class AdminUserListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: users => { this.users = users; this.loading = false; },
      error: () => { this.loading = false; /* handle error */ }
    });
  }

  toggleUser(user: User): void {
    const newStatus = !user.enabled;
    this.userService
      .setUserEnabled(user.id, newStatus)
      .subscribe(() => user.enabled = newStatus);
  }
  
}
