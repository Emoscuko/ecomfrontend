// src/app/shared/components/sidebar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: false
})
export class SidebarComponent {
  adminLinks = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin' },
    { label: 'Products', icon: 'inventory_2', route: '/admin/products' },
    { label: 'Categories', icon: 'category', route: '/admin/categories' },
    { label: 'Orders', icon: 'receipt_long', route: '/admin/orders' },
    { label: 'Users', icon: 'people', route: '/admin/users' },
    { label: 'Applications', icon: 'assignment', route: '/admin/seller-requests' },
    { label: 'Payments', icon: 'payments', route: '/admin/payments' }
  ];
}
