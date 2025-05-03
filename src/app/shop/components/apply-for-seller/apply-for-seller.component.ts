import { Component } from "@angular/core";
import { SellerApplicationService } from "../../../shared/services/seller-application.service";
import {  MatDialogRef } from "@angular/material/dialog";

// src/app/shop/components/apply-for-seller.component.ts
@Component({
  selector: 'app-apply-for-seller',
  template: `
  <h2 mat-dialog-title>Become a Seller</h2>
  <mat-dialog-content>
    <p>You’ll be able to list products after approval.</p>
    <mat-form-field appearance="fill" class="w-full">
      <mat-label>Optional note to admins</mat-label>
      <textarea matInput [(ngModel)]="note"></textarea>
    </mat-form-field>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-flat-button color="primary" (click)="apply()" [disabled]="loading">
      Apply
    </button>
  </mat-dialog-actions>`,
  standalone: false,
  
})
export class ApplyForSellerComponent {
  note = ''; loading = false;
  constructor(private svc: SellerApplicationService,
              private dialogRef: MatDialogRef<ApplyForSellerComponent>) {}
  apply() {
    this.loading = true;
    this.svc.apply(this.note).subscribe(() => this.dialogRef.close(true));
  }
}
