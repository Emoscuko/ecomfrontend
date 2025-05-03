// src/app/admin/components/admin-layout.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  standalone: false,
  styles: [`.admin-container { display: flex; min-height: 100vh; }`]
})
export class AdminLayoutComponent {}
