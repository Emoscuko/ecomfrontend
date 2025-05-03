import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // for routerLink in shared components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material modules (a selection commonly used)
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list'; // for list items in sidebar
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [NavbarComponent,
    FooterComponent, 
    SidebarComponent, 
    LoadingSpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // Material modules
    MatToolbarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule,MatListModule,MatDialogModule,MatSnackBarModule
  ],
  exports: [
    // Export modules so other modules can use them without importing again
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatListModule, MatDialogModule,
    // Export components to use in AppComponent or feature modules
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {}
