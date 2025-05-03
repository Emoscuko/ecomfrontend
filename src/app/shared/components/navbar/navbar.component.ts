// src/app/shared/components/navbar.component.ts
import { Component } from '@angular/core';
import { Router }   from '@angular/router';
import { AuthService }    from '../../services/auth.service';
import { CartService }    from '../../services/cart.service';
import { MatDialog }      from '@angular/material/dialog';
import { MatSnackBar }    from '@angular/material/snack-bar';
import { CompareService, CompareItem } from '../../services/compare.service';
import { ApplyForSellerComponent } from '../../../shop/components/apply-for-seller/apply-for-seller.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false,
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  cartItemCount = 0;
  compareItemCount = 0;

  constructor(
    public auth: AuthService,
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private compareService: CompareService
  ) {
    // Cart total
    this.cartService.getItems().subscribe(items => {
      this.cartItemCount = items.reduce((sum, it) => sum + it.quantity, 0);
    });

    // Compare total (summing each CompareItem.quantity)
    this.compareService.items$.subscribe((items: CompareItem[]) => {
      this.compareItemCount = items.reduce((sum, it) => sum + it.quantity, 0);
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  openApplyDialog() {
    this.dialog.open(ApplyForSellerComponent)
      .afterClosed()
      .subscribe(ok => {
        if (ok) this.snack.open('Application sent!', '', { duration: 3000 });
      });
  }
}
