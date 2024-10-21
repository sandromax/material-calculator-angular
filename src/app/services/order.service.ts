// import { Injectable } from '@angular/core';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {
//
//   private orderData: any;
//
//   setOrder(order: any): void {
//     this.orderData = order;
//   }
//
//   getOrder(): any {
//     return this.orderData;
//   }
//
//   // constructor() { }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private storageKey = 'orderData';

  // Метод для збереження замовлення в sessionStorage
  setOrder(order: any): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(order));
  }

  // Метод для отримання замовлення з sessionStorage
  getOrder(): any {
    const storedOrder = sessionStorage.getItem(this.storageKey);
    return storedOrder ? JSON.parse(storedOrder) : null;
  }

  // Метод для очищення даних замовлення з sessionStorage
  clearOrderData(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
