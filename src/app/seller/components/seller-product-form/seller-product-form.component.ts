// src/app/admin/components/admin-product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, Category } from '../../../shared/services/category.service';
import { SellerProductService } from '../../../shared/services/seller-product.service';

@Component({
  selector: 'app-seller-product-form',
  templateUrl: './seller-product-form.component.html',
  standalone: false,
})
export class SellerProductFormComponent implements OnInit {
  categories: Category[] = [];
  isEditMode = false;
  productId?: number;
  // Reactive form for product
  productForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: SellerProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
      stock: [0, [Validators.required, Validators.min(0)]],
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
          stock: product.stock,
          categoryId: product.category.id,
          imageUrl: product.imageUrl
        });
      });
    }
  }
  public navigateToProducts(): void {
    this.router.navigate(['/seller/products']);
  }
  onSubmit(): void {
    if (this.productForm.invalid) return;
    this.loading = true;
    const productData = this.productForm.value;
    
    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, productData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/seller/products']);
        },
        error: () => { this.loading = false; /* handle error */ }
      });
    } else {
      this.productService.create(productData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/seller/products']);
        },
        error: () => { this.loading = false; /* handle error */ }
      });
    }
  }
}
