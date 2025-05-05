/* ====================================================================
   address-dialog.component.ts
   ==================================================================== */
   import { Component, Inject } from '@angular/core';
   import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
   import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
   import { Address } from '../../../shared/services/address.service';
   
   @Component({
     selector: 'app-address-dialog',
     templateUrl: './address-dialog.component.html',
     standalone: false
   })
   export class AddressDialogComponent {
     form: FormGroup;
   
     constructor(
       private fb: FormBuilder,
       private dialogRef: MatDialogRef<AddressDialogComponent>,
       @Inject(MAT_DIALOG_DATA) public data: { address?: Address }
     ) {
       
       this.form = this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      });
      if (data.address) this.form.patchValue(data.address);
     }
   
     save() {
       if (this.form.invalid) return;
       const addr: Address = { ...this.data.address, ...this.form.value } as Address;
       this.dialogRef.close(addr);
     }
   
     cancel() { this.dialogRef.close(); }
   }