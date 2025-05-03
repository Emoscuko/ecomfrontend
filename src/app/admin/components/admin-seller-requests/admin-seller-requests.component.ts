import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SellerApplication, SellerApplicationService } from '../../../shared/services/seller-application.service';

// src/app/admin/components/admin-seller-requests.component.ts
@Component({
  selector: 'app-admin-seller-requests',
  template: `
  <h1>Seller Applications</h1>
  <table mat-table [dataSource]="apps" class="w-full">
    <ng-container matColumnDef="user"><th mat-header-cell *matHeaderCellDef>User</th>
      <td mat-cell *matCellDef="let a">{{a.user.name}} ({{a.user.email}})</td></ng-container>

    <ng-container matColumnDef="created"><th mat-header-cell *matHeaderCellDef>Date</th>
      <td mat-cell *matCellDef="let a">{{a.createdAt | date:'short'}}</td></ng-container>

    <ng-container matColumnDef="note"><th mat-header-cell *matHeaderCellDef>Note</th>
      <td mat-cell *matCellDef="let a">{{a.note}}</td></ng-container>

    <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th>
      <td mat-cell *matCellDef="let a">
        <button mat-icon-button color="primary" aria-label="Approve" (click)="approve(a.id)">
          <mat-icon>check</mat-icon></button>
        <button mat-icon-button color="warn" aria-label="Reject" (click)="reject(a.id)">
          <mat-icon>close</mat-icon></button>
      </td></ng-container>

    <tr mat-header-row *matHeaderRowDef="cols"></tr>
    <tr mat-row        *matRowDef="let row; columns: cols;"></tr>
  </table>`,
  standalone: false,
})
export class AdminSellerRequestsComponent implements OnInit {
  apps: SellerApplication[] = [];
  cols = ['user','created','note','actions'];
  constructor(private svc: SellerApplicationService, private snack: MatSnackBar) {}
  ngOnInit() { this.refresh(); }
  refresh() { this.svc.listPending().subscribe(a => this.apps = a); }
  approve(id:number){ this.svc.approve(id).subscribe(()=>{this.snack.open('Approved','',{duration:2e3}); this.refresh();}); }
  reject(id:number) { this.svc.reject(id).subscribe(()=>{this.snack.open('Rejected','',{duration:2e3}); this.refresh();}); }
}

