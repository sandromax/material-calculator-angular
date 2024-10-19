import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculationResultComponent } from './calculation-result.component';
import { CalculationService } from '../../services/calculation.service';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';

describe('CalculationResultComponent', () => {
  let component: CalculationResultComponent;
  let fixture: ComponentFixture<CalculationResultComponent>;
  let mockCalculationService: jasmine.SpyObj<CalculationService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    mockCalculationService = jasmine.createSpyObj('CalculationService', ['calculateOrder']);
    mockOrderService = jasmine.createSpyObj('OrderService', ['getOrder']);

    await TestBed.configureTestingModule({
      imports: [CalculationResultComponent],
      providers: [
        { provide: CalculationService, useValue: mockCalculationService },
        { provide: OrderService, useValue: mockOrderService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculationResultComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the total cost and order details', () => {
    const mockOrder = {
      items: [
        { materialType: 'Material', category: 'DSP', subcategory: 'Frame', quantity: 2 }
      ]
    };
    const mockCalculationResult = {
      totalCost: 60,
      details: [
        { materialType: 'Material', category: 'DSP', subcategory: 'Frame', quantity: 2, cost: 60 }
      ]
    };

    mockOrderService.getOrder.and.returnValue(mockOrder);
    mockCalculationService.calculateOrder.and.returnValue(mockCalculationResult);

    fixture.detectChanges();

    expect(component.totalCost).toEqual(60);
    expect(component.orderDetails.length).toBe(1);
    expect(component.orderDetails[0].cost).toBe(60);
  });

  it('should handle case when no order is found', () => {
    mockOrderService.getOrder.and.returnValue(null);
    fixture.detectChanges();

    expect(component.order).toBeNull();
    expect(component.totalCost).toEqual(0);
    expect(component.orderDetails.length).toBe(0);
  });
});
