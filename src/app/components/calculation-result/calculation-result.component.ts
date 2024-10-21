import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CalculationService } from '../../services/calculation.service';
import { PdfService } from '../../services/pdf.service';
import { ActivatedRoute } from '@angular/router'; // Доданий імпорт ActivatedRoute
import jsPDF from 'jspdf'; // Імпорт jsPDF
import 'jspdf-autotable'; // Імпорт плагіна для таблиць

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

  generatePdf(): void {
    const doc = new jsPDF();

    // Додаємо заголовок
    doc.text('Calculation Result', 14, 10);

    // Додаємо таблицю з деталями замовлення
    const columns = ['Material Type', 'Category', 'Subcategory', 'Quantity', 'Cost'];
    const rows = this.orderDetails.map(detail => [
      detail.materialType,
      detail.category,
      detail.subcategory || 'N/A',
      detail.quantity,
      detail.cost.toFixed(2)
    ]);

    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 20
    });

    // Додаємо загальний підсумок
    doc.text(`Total Cost: ${this.totalCost.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);

    // Завантажуємо PDF
    doc.save('calculation_result.pdf');
  }

  }
