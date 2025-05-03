// src/app/admin/components/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { OrderService } from '../../../shared/services/order.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: false,
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
    sales: 0  // total sales amount
  };
  loading = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    // Fetch counts (for simplicity, using .subscribe in sequence; could use forkJoin to parallelize)
    this.productService.getAll().subscribe(products => {
      this.stats.products = products.length;
    });
    this.categoryService.getAll().subscribe(categories => {
      this.stats.categories = categories.length;
    });
    this.orderService.getAllOrders().subscribe(orders => {
      this.stats.orders = orders.length;
      // Calculate total sales from orders
      this.stats.sales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    });
    this.userService.getAllUsers().subscribe(users => {
      this.stats.users = users.length;
      this.loading = false;
    });
  }
}
