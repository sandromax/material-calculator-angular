// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { OrderService } from '../../services/order.service';
// import { CalculationService } from '../../services/calculation.service';
// import { PdfService } from '../../services/pdf.service';
//
// @Component({
//   selector: 'app-calculation-result',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './calculation-result.component.html',
//   styleUrl: './calculation-result.component.css'
// })
// export class CalculationResultComponent {
//   order: any;
//   totalCost: number = 0;
//   orderDetails: any[] = [];
//
//   constructor(
//     private orderService: OrderService,
//     private calculationService: CalculationService,
//     private pdfService: PdfService
//   ) {}
//
//   // ngOnInit(): void {
//   //   this.order = this.orderService.getOrder(); // отримуємо збережене замовлення
//   //   this.calculateTotal(); // розраховуємо загальну вартість
//   // }
//   ngOnInit(): void {
//     this.order = this.orderService.getOrder(); // Отримуємо збережене замовлення
//     if (this.order) {
//       const result = this.calculationService.calculateOrder(this.order);
//       this.totalCost = result.totalCost;
//       this.orderDetails = result.details;
//     }
//   }
//
//   calculateTotal() {
//     // Логіка розрахунку вартості замовлення
//     this.order.items.forEach((item: any) => {
//       // Розрахунок для кожного елементу
//     });
//   }
//
//   // downloadPdf() {
//   //   this.pdfService.generatePdf(this.order, this.totalCost); // генеруємо PDF
//   // }
//
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationService } from '../../services/calculation.service';

@Component({
  selector: 'app-calculation-result',
  standalone: true,
  templateUrl: './calculation-result.component.html',
  styleUrls: ['./calculation-result.component.css'],
  imports: [CommonModule],
})
export class CalculationResultComponent implements OnInit {
  order: any;
  totalCost: number = 0;
  orderDetails: any[] = [];

  constructor(private calculationService: CalculationService) {}

  ngOnInit(): void {
    const result = this.calculationService.getCalculationResult();
    if (result) {
      this.order = result; // Присвоюємо результат у 'order'
      this.totalCost = result.totalCost;
      this.orderDetails = result.details;
    }
  }
}
