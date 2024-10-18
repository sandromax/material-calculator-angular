import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve order data', () => {
    const mockOrder = {
      items: [
        { materialType: 'Wood', category: 'Frame', subcategory: '20mm', quantity: 2 }
      ]
    };

    service.setOrder(mockOrder);
    expect(service.getOrder()).toEqual(mockOrder);
  });

  it('should return undefined if no order is set', () => {
    expect(service.getOrder()).toBeUndefined();
  });

  it('should overwrite previous order data', () => {
    const initialOrder = { items: [{ materialType: 'Wood', category: 'Frame', subcategory: '20mm', quantity: 2 }] };
    const newOrder = { items: [{ materialType: 'MDF', category: 'Facade', subcategory: 'One_side', quantity: 3 }] };

    service.setOrder(initialOrder);
    service.setOrder(newOrder);

    expect(service.getOrder()).toEqual(newOrder);
  });
});
