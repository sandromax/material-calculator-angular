import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsService } from '../../services/materials.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';


@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    TranslatePipe
  ],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  coefficients: number[] = [2.2, 2.5, 2.8, 3.0, 3.5];
  materialsData: any;
  availableCategories: any[] = [];
  availableSubcategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private materialsService: MaterialsService,
    private router: Router,
  ) {
    this.orderForm = this.fb.group({
      items: this.fb.array([]),
      coefficient: [2.2, Validators.required] // Default value
    });
    this.addItem();
  }

  ngOnInit(): void {
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
      availableCategories: [[]], // Individual categories for each item
      availableSubcategories: [[]] // Individual subcategories for each item
    });

    itemGroup.get('materialType')?.valueChanges.subscribe((selectedType) => {
      if (selectedType !== null) {
        this.updateCategories(itemGroup, selectedType);
      }
    });

    itemGroup.get('category')?.valueChanges.subscribe((selectedCategory) => {
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
      const order = this.orderForm.value;
      this.router.navigate(['/result'], { queryParams: { order: JSON.stringify(order) } });
    }
  }

  private updateCategories(itemGroup: FormGroup, selectedType: string): void {
    if (selectedType === 'Transport' || selectedType === 'Work') {
      itemGroup.get('category')?.disable();
      itemGroup.get('subcategory')?.disable();
      itemGroup.get('category')?.setValue('');
      itemGroup.get('subcategory')?.setValue('');
      itemGroup.patchValue({ availableCategories: [], availableSubcategories: [] });
      return;
    }

    itemGroup.get('category')?.enable();
    itemGroup.get('subcategory')?.disable();
    itemGroup.get('subcategory')?.setValue('');

    const categories = this.materialsData.types
      .find((type: any) => type.type === selectedType)?.categories || [];

    itemGroup.patchValue({ availableCategories: categories, availableSubcategories: [] });
  }

  private updateSubcategories(itemGroup: FormGroup, selectedCategory: string): void {
    const selectedType = itemGroup.get('materialType')?.value;
    const typeData = this.materialsData.types.find((type: any) => type.type === selectedType);
    const categoryData = typeData?.categories.find((cat: any) => cat.name === selectedCategory);

    const subcategories = categoryData?.subcategories || [];
    itemGroup.patchValue({ availableSubcategories: subcategories });

    if (subcategories.length > 0) {
      itemGroup.get('subcategory')?.enable();
    } else {
      itemGroup.get('subcategory')?.disable();
      itemGroup.get('subcategory')?.setValue('');
    }
  }
}
