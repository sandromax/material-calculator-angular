import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CalculationService } from '../../services/calculation.service';
import { PdfService } from '../../services/pdf.service';
import { ActivatedRoute } from '@angular/router'; // Доданий імпорт ActivatedRoute

@Component({
  selector: 'app-calculation-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculation-result.component.html',
  styleUrl: './calculation-result.component.css'
})
export class CalculationResultComponent {
  order: any;
  totalCost: number = 0;
  orderDetails: any[] = [];
  calculated: boolean = false; // Змінна для збереження стану обчислення

  constructor(
    private orderService: OrderService,
    private calculationService: CalculationService,
    private pdfService: PdfService,
    private route: ActivatedRoute, // Інжекція ActivatedRoute
  ) {}

  // ngOnInit(): void {
  //   this.order = this.orderService.getOrder(); // отримуємо збережене замовлення
  //   this.calculateTotal(); // розраховуємо загальну вартість
  // }
  // ngOnInit(): void {
  //   this.order = this.orderService.getOrder(); // Отримуємо збережене замовлення
  //   if (this.order) {
  //     const result = this.calculationService.calculateOrder(this.order);
  //     this.totalCost = result.totalCost;
  //     this.orderDetails = result.details;
  //   }
  // }

  // ngOnInit(): void {
  //   // Отримуємо дані з queryParams
  //   this.route.queryParams.subscribe(params => {
  //     const orderData = params['order'];
  //     if (orderData) {
  //       this.order = JSON.parse(orderData);
  //
  //       // Виконуємо розрахунок на основі отриманих даних
  //       const result = this.calculationService.calculateOrder(this.order);
  //       this.totalCost = result.totalCost;
  //       this.orderDetails = result.details;
  //     }
  //   });
  // }

  ngOnInit(): void {
    // Отримуємо дані з queryParams
    this.route.queryParams.subscribe(params => {
      const orderData = params['order'];
      if (orderData) {
        this.order = JSON.parse(orderData);
      }
    });
  }

  onCalculate(): void {
    if (this.order) {
      // Виконуємо розрахунок на основі отриманих даних
      const result = this.calculationService.calculateOrder(this.order);
      this.totalCost = result.totalCost;
      this.orderDetails = result.details;
      this.calculated = true; // Встановлюємо прапорець для відображення результатів
    }
  }

  calculateTotal() {
    // Логіка розрахунку вартості замовлення
    this.order.items.forEach((item: any) => {
      // Розрахунок для кожного елементу
    });
  }

  // downloadPdf() {
  //   this.pdfService.generatePdf(this.order, this.totalCost); // генеруємо PDF
  // }

}
