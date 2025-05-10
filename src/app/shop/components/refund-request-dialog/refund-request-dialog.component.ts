// src/app/shop/components/dialogs/refund-request-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefundRequestService } from '../../../shared/services/refund-request.service';

@Component({
  selector: 'app-refund-request-dialog',
  templateUrl: './refund-request-dialog.component.html',
  standalone: false,
})
export class RefundRequestDialogComponent {
  
  submitting = false;
    form :FormGroup;
  constructor(
    private fb: FormBuilder,
    private refundSvc: RefundRequestService,
    private dialogRef: MatDialogRef<RefundRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number }
  ) {
    this.form = this.fb.group({ reason: ['', [Validators.required, Validators.maxLength(800)]] });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.refundSvc.create(this.data.orderId, this.form.value.reason!).subscribe({
      next: () => this.dialogRef.close(this.form.value.reason),
      complete: () => (this.submitting = false),
    });
  }
}
