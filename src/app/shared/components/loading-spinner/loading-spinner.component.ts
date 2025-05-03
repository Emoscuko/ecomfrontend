// src/app/shared/components/loading-spinner.component.ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-loading-spinner',
  template: `<div class="text-center py-4"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>`,
  standalone: false
})
export class LoadingSpinnerComponent {}
