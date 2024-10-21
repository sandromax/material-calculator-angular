// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class MaterialsService {
//
//   private materialsUrl = 'assets/materials.json'; // Шлях до файлу materials.json
//
//   constructor(private http: HttpClient) {}
//
//   getMaterials(): Observable<any> {
//     return this.http.get<any>(this.materialsUrl);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {
  private materialsUrl = 'assets/materials.json'; // Шлях до файлу materials.json
  private storageKey = 'materialsData';

  constructor(private http: HttpClient) {}

  // Метод для отримання даних про матеріали
  getMaterials(): Observable<any> {
    // Перевіряємо, чи є дані в sessionStorage
    const storedData = sessionStorage.getItem(this.storageKey);
    if (storedData) {
      // Якщо дані знайдено, повертаємо їх як Observable
      return of(JSON.parse(storedData));
    }

    // Якщо даних немає, завантажуємо їх з файлу і зберігаємо в sessionStorage
    return this.http.get<any>(this.materialsUrl).pipe(
      tap((data) => {
        sessionStorage.setItem(this.storageKey, JSON.stringify(data));
      })
    );
  }

  // Метод для очищення даних з sessionStorage
  clearMaterialsData(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
