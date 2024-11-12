import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './translate-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [
  //   {
  //     provide: TranslateLoader,
  //     useFactory: HttpLoaderFactory,
  //     deps: [HttpClient]
  //   },
  //   TranslateService
  // ]
  // providers: [
  //   provideHttpClient(),
  //   provideTranslateLoader(HttpLoaderFactory),
  //   TranslateService
  // ]
  providers: [
    provideHttpClient(),
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    TranslateService
  ]
})
export class AppComponent {
  title = 'calculatorAngular4';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ro');
    this.translate.use('ro');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
