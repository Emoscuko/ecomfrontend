/* ====================================================================
   profile-page.component.ts
   ==================================================================== */
   import { Component, OnInit } from '@angular/core';
   import { MatDialog } from '@angular/material/dialog';
   import { ProfileService, UserProfile } from '../../../shared/services/profile.service';
   import { AddressService, Address } from '../../../shared/services/address.service';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

   
   @Component({
     selector: 'app-profile-page',
     standalone: false,
     template: `
     <h2 class="mb-4">My Profile</h2>
     <p><strong>Name:</strong> {{ profile?.name }}</p>
     <p><strong>Email:</strong> {{ profile?.email }}</p>
   
     <h3 class="mt-5 mb-2">Addresses</h3>
     <button mat-stroked-button color="primary" (click)="openDialog()">Add address</button>
   
     <table mat-table [dataSource]="addresses" class="mt-3 w-full">
       <ng-container matColumnDef="street">
         <th mat-header-cell *matHeaderCellDef>Street</th>
         <td mat-cell *matCellDef="let a">{{ a.street }}</td>
       </ng-container>
   
       <ng-container matColumnDef="city">
         <th mat-header-cell *matHeaderCellDef>City</th>
         <td mat-cell *matCellDef="let a">{{ a.city }}</td>
       </ng-container>
   
       <ng-container matColumnDef="state">
         <th mat-header-cell *matHeaderCellDef>State</th>
         <td mat-cell *matCellDef="let a">{{ a.state }}</td>
       </ng-container>
   
       <ng-container matColumnDef="zip">
         <th mat-header-cell *matHeaderCellDef>ZIP</th>
         <td mat-cell *matCellDef="let a">{{ a.zip }}</td>
       </ng-container>
   
       <ng-container matColumnDef="actions">
         <th mat-header-cell *matHeaderCellDef></th>
         <td mat-cell *matCellDef="let a">
           <button mat-icon-button color="primary" (click)="openDialog(a)"><mat-icon>edit</mat-icon></button>
           <button mat-icon-button color="warn" (click)="deleteAddress(a)"><mat-icon>delete</mat-icon></button>
         </td>
       </ng-container>
   
       <tr mat-header-row *matHeaderRowDef="columns"></tr>
       <tr mat-row *matRowDef="let row; columns: columns"></tr>
     </table>
     `,
     styles: [`:host { display:block; padding:1rem; } table { width:100%; }`]
   })
   export class ProfilePageComponent implements OnInit {
     profile?: UserProfile;
     addresses: Address[] = [];
     columns = ['street', 'city', 'state', 'zip', 'actions'];
   
     constructor(
       private profileService: ProfileService,
       private addressService: AddressService,
       private dialog: MatDialog
     ) {}
   
     ngOnInit(): void {
       this.loadProfile();
     }
   
     private loadProfile() {
       this.profileService.me().subscribe(p => {
         this.profile = p;
         this.addresses = p.addresses;
       });
     }
   
     openDialog(addr?: Address) {
       this.dialog.open(AddressDialogComponent, {
         width: '400px',
         data: { address: addr }
       }).afterClosed().subscribe((result: Address | undefined) => {
         if (!result) return;
         if (addr) {
           // update existing
           this.addressService.update(result).subscribe(() => this.loadProfile());
         } else {
           // add new
           this.addressService.add(result).subscribe(() => this.loadProfile());
         }
       });
     }
   
     deleteAddress(addr: Address) {
       if (!addr.id) return;
       this.addressService.delete(addr.id).subscribe(() => this.loadProfile());
     }
   }