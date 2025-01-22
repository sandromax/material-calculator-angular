import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsService } from '../../services/materials.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';
import { OrderDetail } from '../../models/order-detail.model';
import { CalculationService } from '../../services/calculation.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    TranslatePipe,
    FlexModule,
  ],
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  materialsData: any;
  orderDetails: OrderDetail[] = [];
  totalCost: number = 0;
  totalWithCoefficient: number = 0;
  coefficients: number[] = [2.2, 2.5, 2.8, 3.0, 3.5];

  constructor(
    private fb: FormBuilder,
    private materialsService: MaterialsService,
    private calculationService: CalculationService
  ) {
    this.orderForm = this.fb.group({
      items: this.fb.array([]),
      coefficient: [2.2, Validators.required],
    });
    this.addItem(); // Додаємо перший елемент за замовчуванням
  }

  ngOnInit(): void {
    this.materialsService.getMaterials().subscribe((data) => {
      this.materialsData = data;
    });
  }

  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  // addItem(): void {
  //   const lastItem = this.items.at(this.items.length - 1);
  //
  //   // Перевірка, чи всі поля попередньої форми заповнені
  //   if (lastItem && !lastItem.valid) {
  //     lastItem.markAllAsTouched();
  //     return;
  //   }
  //
  //   // Додавання нового елемента форми
  //   const itemGroup = this.fb.group({
  //     materialType: ['', Validators.required],
  //     category: ['', Validators.required],
  //     subcategory: ['', Validators.required],
  //     quantity: ['', [Validators.required, Validators.min(1)]],
  //   });
  //   this.items.push(itemGroup);
  // }

  addItem(): void {
    const lastItem = this.items.at(this.items.length - 1);

    // Перевірка, чи всі поля попередньої форми заповнені
    if (lastItem && !lastItem.valid) {
      lastItem.markAllAsTouched();
      return;
    }

    // Додавання нового елемента форми
    const itemGroup = this.fb.group({
      materialType: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      availableCategories: [[]], // Для зберігання індивідуальних категорій
      availableSubcategories: [[]], // Для зберігання індивідуальних підкатегорій
    });

    // itemGroup.get('materialType')?.valueChanges.subscribe((selectedType) => {
    //   this.updateCategories(itemGroup, selectedType);
    // });
    //
    // itemGroup.get('category')?.valueChanges.subscribe((selectedCategory) => {
    //   this.updateSubcategories(itemGroup, selectedCategory);
    // });

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

  removeItem(): void {
    if (this.items.length > 1) {
      this.items.removeAt(this.items.length - 1);
    }
  }

  updateTable(): void {
    if (this.orderForm.valid) {
      this.orderDetails = this.items.value.map((item: any) => {
        const cost = this.calculationService.calculateItemCost(item);
        return {
          materialType: item.materialType,
          category: item.category,
          subcategory: item.subcategory,
          quantity: item.quantity,
          cost: cost,
        };
      });

      // Підрахунок загальної вартості
      this.totalCost = this.orderDetails.reduce((acc, item) => acc + item.cost, 0);

      // Підрахунок із коефіцієнтом
      const selectedCoefficient = this.orderForm.get('coefficient')?.value || 1;
      this.totalWithCoefficient = this.totalCost * selectedCoefficient;
    } else {
      this.items.markAllAsTouched();
    }
  }

  downloadPDF(): void {
    const container = document.querySelector('.invoice-container') as HTMLElement;

    if (!container) {
      console.error('Container not found!');
      return;
    }

    // Використання html2canvas для створення зображення контейнера
    html2canvas(container, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Отримання зображення у форматі PNG

      const pdf = new jsPDF({
        orientation: 'portrait', // Орієнтація сторінки
        unit: 'mm',
        format: 'a4', // Формат A4
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Розрахунок масштабування
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const imgX = (pageWidth - imgWidth * ratio) / 2;
      const imgY = 10; // Відступ зверху

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Збереження PDF
      pdf.save('invoice.pdf');
    });
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



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MaterialsService } from '../../services/materials.service';
// import { Router } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import {TranslatePipe} from '@ngx-translate/core';
// import {FlexModule} from '@angular/flex-layout';
// import {OrderDetail} from '../../models/order-detail.model';
// import {CalculationService} from '../../services/calculation.service';
//
//
// @Component({
//   selector: 'app-order-form',
//   standalone: true,
//   templateUrl: './order-form.component.html',
//   styleUrls: ['./order-form.component.css'],
//   imports: [
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//     MatIconModule,
//     MatFormFieldModule,
//     ReactiveFormsModule,
//     CommonModule,
//     TranslatePipe,
//     FlexModule
//   ],
// })
//
// export class OrderFormComponent implements OnInit {
//   orderForm: FormGroup;
//   coefficients: number[] = [2.2, 2.5, 2.8, 3.0, 3.5];
//   materialsData: any;
//   availableCategories: any[] = [];
//   availableSubcategories: any[] = [];
//   // orderDetails: any[] = [];
//   orderDetails: { totalCost: number; details: OrderDetail[] } = { totalCost: 0, details: [] };
//   totalCost: number = 0;
//
//   constructor(
//     private fb: FormBuilder,
//     private materialsService: MaterialsService,
//     private router: Router,
//     private calculationService: CalculationService,
//   ) {
//     this.orderForm = this.fb.group({
//       items: this.fb.array([]),
//       coefficient: [2.2, Validators.required] // Default value
//     });
//     this.addItem();
//   }
//
//   ngOnInit(): void {
//     this.materialsService.getMaterials().subscribe((data) => {
//       this.materialsData = data;
//     });
//   }
//
//   get items(): FormArray {
//     return this.orderForm.get('items') as FormArray;
//   }
//
//   // addItem(): void {
//   //   const itemGroup = this.fb.group({
//   //     materialType: ['', Validators.required],
//   //     category: [{ value: '', disabled: true }, Validators.required],
//   //     subcategory: [{ value: '', disabled: true }, Validators.required],
//   //     quantity: ['', [Validators.required, Validators.min(1)]],
//   //     availableCategories: [[]], // Individual categories for each item
//   //     availableSubcategories: [[]] // Individual subcategories for each item
//   //   });
//   //
//   //   itemGroup.get('materialType')?.valueChanges.subscribe((selectedType) => {
//   //     if (selectedType !== null) {
//   //       this.updateCategories(itemGroup, selectedType);
//   //     }
//   //   });
//   //
//   //   itemGroup.get('category')?.valueChanges.subscribe((selectedCategory) => {
//   //     if (selectedCategory !== null) {
//   //       this.updateSubcategories(itemGroup, selectedCategory);
//   //     }
//   //   });
//   //
//   //   this.items.push(itemGroup);
//   // }
//
//   removeItem(index: number): void {
//     this.items.removeAt(index);
//   }
//
//   onSubmit(): void {
//     if (this.orderForm.valid) {
//       const order = this.orderForm.value;
//       this.router.navigate(['/result'], { queryParams: { order: JSON.stringify(order) } });
//     }
//   }
//
//   private updateCategories(itemGroup: FormGroup, selectedType: string): void {
//     if (selectedType === 'Transport' || selectedType === 'Work') {
//       itemGroup.get('category')?.disable();
//       itemGroup.get('subcategory')?.disable();
//       itemGroup.get('category')?.setValue('');
//       itemGroup.get('subcategory')?.setValue('');
//       itemGroup.patchValue({ availableCategories: [], availableSubcategories: [] });
//       return;
//     }
//
//     itemGroup.get('category')?.enable();
//     itemGroup.get('subcategory')?.disable();
//     itemGroup.get('subcategory')?.setValue('');
//
//     const categories = this.materialsData.types
//       .find((type: any) => type.type === selectedType)?.categories || [];
//
//     itemGroup.patchValue({ availableCategories: categories, availableSubcategories: [] });
//   }
//
//   private updateSubcategories(itemGroup: FormGroup, selectedCategory: string): void {
//     const selectedType = itemGroup.get('materialType')?.value;
//     const typeData = this.materialsData.types.find((type: any) => type.type === selectedType);
//     const categoryData = typeData?.categories.find((cat: any) => cat.name === selectedCategory);
//
//     const subcategories = categoryData?.subcategories || [];
//     itemGroup.patchValue({ availableSubcategories: subcategories });
//
//     if (subcategories.length > 0) {
//       itemGroup.get('subcategory')?.enable();
//     } else {
//       itemGroup.get('subcategory')?.disable();
//       itemGroup.get('subcategory')?.setValue('');
//     }
//   }
//
//   sendToTable(): void {
//     if (this.orderForm.valid) {
//       this.orderDetails.details = this.calculationService.calculateOrder(this.orderForm.value.items);
//       this.totalCost = this.orderDetails.details.reduce((acc, item) => acc + item.cost, 0);
//     }
//   }
//
//   addItem(): void {
//     if (this.validateFields()) {
//       const item = this.fb.group({
//         materialType: ['', Validators.required],
//         category: ['', Validators.required],
//         subcategory: ['', Validators.required],
//         quantity: ['', [Validators.required, Validators.min(1)]]
//       });
//       this.items.push(item);
//     }
//   }
//
//   validateFields(): boolean {
//     const lastItem = this.items.at(this.items.length - 1);
//     return lastItem.get('materialType')?.value &&
//       lastItem.get('quantity')?.value > 0 &&
//       (lastItem.get('materialType')?.value === 'Material' || lastItem.get('materialType')?.value === 'Hardware'
//         ? lastItem.get('category')?.value && lastItem.get('subcategory')?.value
//         : true);
//   }
//
//
// }
