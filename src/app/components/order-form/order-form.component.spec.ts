import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form.component';
import { OrderService } from '../../services/order.service';
import { MaterialsService } from '../../services/materials.service';
import { of } from 'rxjs';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockMaterialsService: jasmine.SpyObj<MaterialsService>;

  const mockMaterialsData = {
    types: [
      {
        type: 'Material',
        categories: [
          { name: 'DSP', subcategories: [{ name: 'Frame' }, { name: 'Facade' }] },
          { name: 'MDF', subcategories: [{ name: 'One_side' }, { name: 'Two_side' }] },
        ],
      },
      {
        type: 'Hardware',
        categories: [
          { name: 'Hinges', subcategories: [{ name: 'Intermat' }, { name: 'Inner' }] },
          { name: 'Runner', subcategories: [{ name: 'Quadro' }, { name: 'Push' }] },
        ],
      },
      {
        type: 'Transport',
        pricePerKilometer: 10,
      },
      {
        type: 'Work',
        pricePerDay: 150,
      },
    ],
  };

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['setOrder']);
    mockMaterialsService = jasmine.createSpyObj('MaterialsService', ['getMaterials']);
    mockMaterialsService.getMaterials.and.returnValue(of(mockMaterialsData));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, OrderFormComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: MaterialsService, useValue: mockMaterialsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with one item', () => {
    expect(component.items.length).toBe(1);
  });

  it('should add a new item to the form', () => {
    component.addItem();
    expect(component.items.length).toBe(2);
  });

  it('should remove an item from the form', () => {
    component.addItem();
    component.removeItem(0);
    expect(component.items.length).toBe(1);
  });

  it('should update categories when materialType changes', () => {
    const itemGroup = component.items.at(0);
    itemGroup.get('materialType')?.setValue('Hardware');
    fixture.detectChanges();

    expect(component.availableCategories.length).toBe(2);
    expect(component.availableCategories[0].name).toBe('Hinges');
    expect(component.availableCategories[1].name).toBe('Runner');
  });

  it('should update subcategories when category changes', () => {
    const itemGroup = component.items.at(0);
    itemGroup.get('materialType')?.setValue('Hardware');
    fixture.detectChanges();

    itemGroup.get('category')?.setValue('Runner');
    fixture.detectChanges();

    expect(component.availableSubcategories.length).toBe(2);
    expect(component.availableSubcategories[0].name).toBe('Quadro');
    expect(component.availableSubcategories[1].name).toBe('Push');
  });

  it('should disable category and subcategory when materialType is Transport', () => {
    const itemGroup = component.items.at(0);
    itemGroup.get('materialType')?.setValue('Transport');
    fixture.detectChanges();

    expect(itemGroup.get('category')?.disabled).toBeTrue();
    expect(itemGroup.get('subcategory')?.disabled).toBeTrue();
  });

  it('should disable category and subcategory when materialType is Work', () => {
    const itemGroup = component.items.at(0);
    itemGroup.get('materialType')?.setValue('Work');
    fixture.detectChanges();

    expect(itemGroup.get('category')?.disabled).toBeTrue();
    expect(itemGroup.get('subcategory')?.disabled).toBeTrue();
  });

  it('should enable category and subcategory when materialType is Material', () => {
    const itemGroup = component.items.at(0);
    itemGroup.get('materialType')?.setValue('Material');
    fixture.detectChanges();

    expect(itemGroup.get('category')?.enabled).toBeTrue();
    expect(itemGroup.get('subcategory')?.disabled).toBeTrue();
  });

  it('should submit if the form is valid', () => {
    const itemGroup = component.items.at(0);
    itemGroup.patchValue({
      materialType: 'Material',
      category: 'DSP',
      subcategory: 'Frame',
      quantity: 2
    });
    component.onSubmit();
    expect(mockOrderService.setOrder).toHaveBeenCalledWith(component.orderForm.value);
  });
});


// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { OrderService } from '../../services/order.service';
// import { MaterialsService } from '../../services/materials.service';
// import { of } from 'rxjs';
//
// import { OrderFormComponent } from './order-form.component';
//
// describe('OrderFormComponent', () => {
//   let component: OrderFormComponent;
//   let fixture: ComponentFixture<OrderFormComponent>;
//   let mockOrderService: jasmine.SpyObj<OrderService>;
//   let mockMaterialsService: jasmine.SpyObj<MaterialsService>;
//
//   // beforeEach(async () => {
//   //   await TestBed.configureTestingModule({
//   //     imports: [OrderFormComponent]
//   //   })
//   //   .compileComponents();
//   //
//   //   fixture = TestBed.createComponent(OrderFormComponent);
//   //   component = fixture.componentInstance;
//   //   fixture.detectChanges();
//   // });
//
//   beforeEach(async () => {
//     mockOrderService = jasmine.createSpyObj('OrderService', ['setOrder']);
//     mockMaterialsService = jasmine.createSpyObj('MaterialsService', ['getMaterials']);
//
//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, OrderFormComponent],
//       providers: [
//         { provide: OrderService, useValue: mockOrderService },
//         { provide: MaterialsService, useValue: mockMaterialsService }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(OrderFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should initialize the form with one item', () => {
//     expect(component.items.length).toBe(1);
//   });
//
//   it('should add a new item to the form', () => {
//     component.addItem();
//     expect(component.items.length).toBe(2);
//   });
//
//   it('should remove an item from the form', () => {
//     component.addItem();
//     component.removeItem(0);
//     expect(component.items.length).toBe(1);
//   });
//
//   it('should not submit if the form is invalid', () => {
//     component.onSubmit();
//     expect(mockOrderService.setOrder).not.toHaveBeenCalled();
//   });
//
//   it('should submit if the form is valid', () => {
//     component.items.at(0).patchValue({
//       materialType: 'Wood',
//       category: 'Frame',
//       subcategory: '20mm',
//       quantity: 2
//     });
//     component.onSubmit();
//     expect(mockOrderService.setOrder).toHaveBeenCalledWith(component.orderForm.value);
//   });
//
//   it('should validate quantity field to be at least 1', () => {
//     const quantityControl = component.items.at(0).get('quantity');
//     quantityControl?.setValue(0);
//     expect(quantityControl?.valid).toBeFalse();
//     quantityControl?.setValue(1);
//     expect(quantityControl?.valid).toBeTrue();
//   });
// });
