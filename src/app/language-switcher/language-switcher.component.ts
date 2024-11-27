import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <mat-select (selectionChange)="changeLanguage($event.value)" placeholder="Select Language">
      <mat-option value="fr">Français</mat-option>
      <mat-option value="ru">Руська</mat-option>
      <mat-option value="ro">Română</mat-option>
    </mat-select>
  `,
  styles: [
    `
      mat-select {
        margin: 10px;
        min-width: 150px;
      }
    `
  ],
  imports: [MatSelect, MatOption],
  providers: [TranslateService],
})
export class LanguageSwitcherComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ru');
    this.translate.use('ru');
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }
}

