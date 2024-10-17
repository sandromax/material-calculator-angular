import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialsService } from '../../services/materials.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css',
  imports: [ReactiveFormsModule, CommonModule],
})
export class OrderFormComponent {

  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private materialsService: MaterialsService,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      items: this.fb.array([]),
    });
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(
      this.fb.group({
        materialType: ['', Validators.required],
        category: ['', Validators.required],
        subcategory: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.orderService.setOrder(this.orderForm.value); // зберігаємо дані замовлення
    }
  }
}
