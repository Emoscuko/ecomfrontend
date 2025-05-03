import { Component, OnInit } from '@angular/core';
import { CompareItem, CompareService } from '../../../shared/services/compare.service';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/services/product.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  standalone: false,
})
export class CompareComponent implements OnInit {
    items$!: Observable<CompareItem[]>;
  constructor(private compare: CompareService) {}
  ngOnInit(): void {
      this.items$ = this.compare.items$;
  }
  remove(id: number) { this.compare.remove(id); }
  clear() { this.compare.clear(); }
}
