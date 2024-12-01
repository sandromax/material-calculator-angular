import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CalculationService } from '../../services/calculation.service';
import { PdfService } from '../../services/pdf.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-calculation-result',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslatePipe
  ],
  templateUrl: './calculation-result.component.html',
  styleUrl: './calculation-result.component.css'
})
export class CalculationResultComponent {
  order: any;
  totalCost: number = 0;
  adjustedTotalCost: number = 0;
  orderDetails: any[] = [];
  coefficient: number = 1;
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
        this.coefficient = this.order.coefficient || 1;
      }
    });
  }

  onCalculate(): void {
    if (this.order) {
      const result = this.calculationService.calculateOrder(this.order);
      this.totalCost = result.totalCost;
      this.adjustedTotalCost = this.totalCost * this.coefficient;
      this.orderDetails = result.details;
      this.calculated = true;
    }
  }
}
