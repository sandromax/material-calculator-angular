import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsService } from '../../services/materials.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  materialsData: any;
  availableCategories: any[] = [];
  availableSubcategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private materialsService: MaterialsService,
    private orderService: OrderService,
    private router: Router // Інжекція Router
  ) {
    this.orderForm = this.fb.group({
      items: this.fb.array([]),
    });
    this.addItem();
  }

  ngOnInit(): void {
    // Завантажуємо дані з materials.json через сервіс
    this.materialsService.getMaterials().subscribe((data) => {
      this.materialsData = data;
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      materialType: ['', Validators.required],
      category: [{ value: '', disabled: true }, Validators.required],
      subcategory: [{ value: '', disabled: true }, Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });

    // Dynamically update the lists of categories and subcategories when the `materialType` changes.
    itemGroup.get('materialType')?.valueChanges.subscribe((selectedType) => {
      // this.updateCategories(itemGroup, selectedType);
      if (selectedType !== null) {
        this.updateCategories(itemGroup, selectedType);
      }
    });

    // Dynamically update the list of subcategories when the `category` changes.
    itemGroup.get('category')?.valueChanges.subscribe((selectedCategory) => {
      // this.updateSubcategories(itemGroup, selectedCategory);
      if (selectedCategory !== null) {
        this.updateSubcategories(itemGroup, selectedCategory);
      }
    });

    this.items.push(itemGroup);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderService.setOrder(this.orderForm.value);
      this.router.navigate(['/result']);
    }
  }

  private updateCategories(itemGroup: FormGroup, selectedType: string): void {
    // If "Transport" or "Work" is selected, make the "category" and "subcategory" fields disabled.
    if (selectedType === 'Transport' || selectedType === 'Work') {
      itemGroup.get('category')?.disable();
      itemGroup.get('subcategory')?.disable();
      itemGroup.get('category')?.setValue('');
      itemGroup.get('subcategory')?.setValue('');
      this.availableCategories = [];
      this.availableSubcategories = [];
      return;
    }

    // Otherwise, make the fields enabled and populate the categories based on the selected type.
    itemGroup.get('category')?.enable();
    itemGroup.get('subcategory')?.disable();
    itemGroup.get('subcategory')?.setValue('');
    this.availableCategories = this.materialsData.types
      .find((type: any) => type.type === selectedType)?.categories || [];
    this.availableSubcategories = [];
  }

  private updateSubcategories(itemGroup: FormGroup, selectedCategory: string): void {
    const selectedType = itemGroup.get('materialType')?.value;
    const typeData = this.materialsData.types.find((type: any) => type.type === selectedType);
    const categoryData = typeData?.categories.find((cat: any) => cat.name === selectedCategory);
    this.availableSubcategories = categoryData?.subcategories || [];

    if (this.availableSubcategories.length > 0) {
      itemGroup.get('subcategory')?.enable();
    } else {
      itemGroup.get('subcategory')?.disable();
      itemGroup.get('subcategory')?.setValue('');
    }
  }
}
