import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CalculationService } from '../../services/calculation.service';
import { PdfService } from '../../services/pdf.service';
import { ActivatedRoute } from '@angular/router';

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
  calculated: boolean = false;

  constructor(
    private orderService: OrderService,
    private calculationService: CalculationService,
    private pdfService: PdfService,
    private route: ActivatedRoute, // Injection ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderData = params['order'];
      if (orderData) {
        this.order = JSON.parse(orderData);
      }
    });
  }

  onCalculate(): void {
    if (this.order) {
      const result = this.calculationService.calculateOrder(this.order);
      this.totalCost = result.totalCost;
      this.orderDetails = result.details;
      this.calculated = true;
    }
  }
}
