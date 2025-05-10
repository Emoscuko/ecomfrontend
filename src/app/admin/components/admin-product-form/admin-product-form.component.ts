// src/app/admin/components/admin-product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../shared/services/product.service';
import { CategoryService, Category } from '../../../shared/services/category.service';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  standalone: false,
})
export class AdminProductFormComponent implements OnInit {
  categories: Category[] = [];
  isEditMode = false;
  productId?: number;
  // Reactive form for product
  productForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // in AdminProductFormComponent.constructor
this.productForm = this.fb.group({
  name: ['', Validators.required],
  description: [''],
  price: [0, [Validators.required, Validators.min(0)]],
  stock: [0, [Validators.required, Validators.min(0)]],
  categoryId: [null, Validators.required],
  sellerId:   [null, Validators.required],   // ← new
  imageUrl: ['']
});

  }

  ngOnInit(): void {
    // Load categories for select list
    this.categoryService.getAll().subscribe(cats => this.categories = cats);
    // Determine if editing an existing product
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.productId = Number(idParam);
      // Load product data
      this.productService.getById(this.productId).subscribe(product => {
        // Populate form with product data
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stock:       product.stock,
          categoryId: product.category.id,
          sellerId:   product.sellerId,   // ← new
          imageUrl: product.imageUrl
        });
      });
    }
  }
  public navigateToProducts(): void {
    this.router.navigate(['/admin/products']);
  }
  onSubmit(): void {
    if (this.productForm.invalid) return;
    this.loading = true;
    const productData = this.productForm.value;
    
    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, productData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/products']);
        },
        error: () => { this.loading = false; /* handle error */ }
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/admin/products']);
        },
        error: () => { this.loading = false; /* handle error */ }
      });
    }
  }
}
