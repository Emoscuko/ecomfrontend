/* ====================================================================
   profile.module.ts
   ==================================================================== */
   import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { MatButtonModule } from '@angular/material/button';
   import { MatTableModule } from '@angular/material/table';
   import { MatIconModule } from '@angular/material/icon';
   import { MatDialogModule } from '@angular/material/dialog';
   import { MatFormFieldModule } from '@angular/material/form-field';
   import { MatInputModule } from '@angular/material/input';
   import { MatSelectModule } from '@angular/material/select';
   
   import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { AddressDialogComponent } from './components/address-dialog/address-dialog.component';

   
   @NgModule({
     declarations: [ProfilePageComponent, AddressDialogComponent],
     imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       MatButtonModule,
       MatTableModule,
       MatIconModule,
       MatDialogModule,
       MatFormFieldModule,
       MatInputModule,
       MatSelectModule,
       ProfileRoutingModule
     ]
   })
   export class ProfileModule {}