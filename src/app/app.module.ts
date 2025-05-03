import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
// Import interceptors
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,       // SharedModule brings in common components (navbar, etc.)
    AppRoutingModule,
        // AppRoutingModule sets up lazy-loaded feature modules
  ],
  providers: [
    // Attach JWT token to requests
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // Global error handler (e.g., for auth errors, API errors)
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {
  
}
console.log((AppModule as any).ɵmod.declarations);
console.log((SharedModule as any).ɵmod.exports);

