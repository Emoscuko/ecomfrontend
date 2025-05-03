// src/app/shared/services/compare.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CompareItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CompareService {
  private _items$ = new BehaviorSubject<CompareItem[]>([]);
  readonly items$ = this._items$.asObservable();
  private readonly MAX = 4;

  constructor(private snackBar: MatSnackBar) {}

  add(product: Product, quantity: number = 1): void {
    const items = this._items$.value;

    if (items.length >= this.MAX) {
      this.snackBar.open(`You can compare up to ${this.MAX} products`, '', { duration: 3000 });
      return;
    }
    if (items.find(item => item.product.id === product.id)) {
      this.snackBar.open('This product is already in your comparison list', '', { duration: 3000 });
      return;
    }

    this._items$.next([...items, { product, quantity }]);
    this.snackBar.open(`${product.name} added to compare`, '', { duration: 3000 });
  }

  remove(productId: number): void {
    const filtered = this._items$.value.filter(item => item.product.id !== productId);
    this._items$.next(filtered);
    this.snackBar.open('Product removed from comparison', '', { duration: 3000 });
  }

  clear(): void {
    this._items$.next([]);
    this.snackBar.open('Comparison list cleared', '', { duration: 3000 });
  }
}
