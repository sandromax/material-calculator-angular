import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderData: any;

  setOrder(order: any): void {
    this.orderData = order;
  }

  getOrder(): any {
    return this.orderData;
  }

  // constructor() { }
}
