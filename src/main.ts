import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
// import { routes } from './app/app-routing.module';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Підключення HttpClient для всього застосунку
    provideRouter(routes), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
