// src/app/admin/components/admin-category-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../../../shared/services/category.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  standalone: false,
})
export class AdminCategoryListComponent implements OnInit {
  categories: Category[] = [];
  newCategoryName: string = '';
  loading = false;
  newDescription: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: cats => { this.categories = cats; this.loading = false; },
      error: () => { this.loading = false; /* handle error */ }
    });
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;
    this.categoryService.create({ name: this.newCategoryName,description:this.newDescription }).subscribe({
      next: () => {
        this.newCategoryName = '';
        this.loadCategories();
      }
    });
  }

  editCategory(cat: Category): void {
    const newName = prompt("Edit category name", cat.name);
    const newDescription = prompt("Edit category description", cat.description);
    
    if (newName && newName.trim() && 
    newDescription && newDescription.trim() && 
    (newName !== cat.name || newDescription !== cat.description)) {
      this.categoryService.update(cat.id, { 
        name: newName.trim(), 
        description: newDescription.trim() 
      }).subscribe(() => this.loadCategories());
    }
  }

  deleteCategory(cat: Category): void {
    if (confirm(`Delete category "${cat.name}"?`)) {
      this.categoryService.delete(cat.id).subscribe(() => this.loadCategories());
    }
  }
}
