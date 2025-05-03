import { Component, Input, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../../shared/services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './review.component.html',
  standalone: false
})
export class ReviewComponent implements OnInit {
  @Input() productId!: number;

  reviews: Review[] = [];
  // form model
  rating = 5;
  comment = '';
  submitting = false;

  constructor(private reviewSvc: ReviewService) {}

  ngOnInit() { this.load(); }

  load() {
    this.reviewSvc.list(this.productId)
        .subscribe(r => this.reviews = r);
  }

  submit() {
    if (!this.comment.trim()) return;
    this.submitting = true;
    this.reviewSvc.add(this.productId, this.rating, this.comment).subscribe({
      next: () => { this.comment=''; this.load(); },
      error: err => alert(err.error?.message ?? 'Unable to add review'),
      complete: () => this.submitting = false
    });
  }
}
