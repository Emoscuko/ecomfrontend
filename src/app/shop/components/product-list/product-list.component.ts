// src/app/shop/components/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../shared/services/product.service';
import { CategoryService, Category } from '../../../shared/services/category.service';
import { CartService } from '../../../shared/services/cart.service';  // Import CartService
import { CompareService } from '../../../shared/services/compare.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedCategory: number | 'all' = 'all';
  searchTerm: string = '';

  loading = false;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private cartService: CartService, // Inject CartService here
    private compare: CompareService
  )  {}

  ngOnInit(): void {
    this.loading = true;
    // Load categories and products in parallel
    this.categoryService.getAll().subscribe(categories => this.categories = categories);
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.applyFilters();
      this.loading = false;
    });
  }
  addToCompare(product: Product) {
    this.compare.add(product);
  }
   addToCart(product: Product): void {
    this.cartService.addItem(product);  // Call addItem from CartService to add the product to the cart
  }
  applyFilters(): void {
    // Filter by category and search term
    let results = [...this.products];
    if (this.selectedCategory !== 'all') {
      results = results.filter(p => p.category.id === this.selectedCategory);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }
    this.filteredProducts = results;
  }

  onCategoryChange(categoryId: string): void {
    this.selectedCategory = categoryId === 'all' ? 'all' : Number(categoryId);
    this.applyFilters();
  } 

  onSearch(term: string): void {
    this.searchTerm = term;
    this.applyFilters();
  }
}
