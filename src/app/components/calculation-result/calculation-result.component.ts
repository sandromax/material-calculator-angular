import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { PdfService } from '../../services/pdf.service';

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

  constructor(
    private orderService: OrderService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.order = this.orderService.getOrder(); // отримуємо збережене замовлення
    this.calculateTotal(); // розраховуємо загальну вартість
  }

  calculateTotal() {
    // Логіка розрахунку вартості замовлення
    this.order.items.forEach((item: any) => {
      // Розрахунок для кожного елементу
    });
  }

  downloadPdf() {
    this.pdfService.generatePdf(this.order, this.totalCost); // генеруємо PDF
  }

}
