// src/app/admin/components/admin-product-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../../shared/services/product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  standalone: false,
})
export class AdminProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'actions'];
  loading = false;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.productService.getAllAdmin().subscribe({
      next: products => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // handle error
      }
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/admin/products', product.id]);
  }

  addProduct(): void {
    this.router.navigate(['/admin/products/new']);
  }

  deleteProduct(product: Product): void {
    if (confirm(`Deactivate product "${product.name}"?`)) {
      this.productService.delete(product.id).subscribe(() => this.refresh());
    }
  }

  activateProduct(product: Product): void {
    if (confirm(`Activate product "${product.name}"?`)) {
      this.productService.activate(product.id).subscribe(() => this.refresh());
    }
  }
}
