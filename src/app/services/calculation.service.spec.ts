import { TestBed } from '@angular/core/testing';
import { CalculationService } from './calculation.service';
import { MaterialsService } from './materials.service';
import { of } from 'rxjs';

describe('CalculationService', () => {
  let service: CalculationService;
  let mockMaterialsService: jasmine.SpyObj<MaterialsService>;

  const mockMaterialsData = {
    types: [
      {
        type: 'Material',
        categories: [
          {
            name: 'DSP',
            subcategories: [
              { name: 'Frame', pricePerSquareMeter: 30 },
              { name: 'Facade', pricePerSquareMeter: 50 }
            ]
          }
        ]
      },
      {
        type: 'Hardware',
        categories: [
          {
            name: 'Hinges',
            subcategories: [
              { name: 'Intermat', pricePerPiece: 5 },
              { name: 'Inner', pricePerPiece: 6 }
            ]
          }
        ]
      },
      {
        type: 'Transport',
        pricePerKilometer: 10
      },
      {
        type: 'Work',
        pricePerDay: 150
      }
    ]
  };

  beforeEach(() => {
    mockMaterialsService = jasmine.createSpyObj('MaterialsService', ['getMaterials']);
    mockMaterialsService.getMaterials.and.returnValue(of(mockMaterialsData));

    TestBed.configureTestingModule({
      providers: [
        CalculationService,
        { provide: MaterialsService, useValue: mockMaterialsService }
      ]
    });

    service = TestBed.inject(CalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the total cost for Material type', () => {
    const order = {
      items: [
        { materialType: 'Material', category: 'DSP', subcategory: 'Frame', quantity: 2 },
        { materialType: 'Material', category: 'DSP', subcategory: 'Facade', quantity: 3 }
      ]
    };

    const result = service.calculateOrder(order);
    expect(result.totalCost).toEqual(190); // 2 * 30 + 3 * 50
    expect(result.details.length).toBe(2);
    expect(result.details[0].cost).toBe(60); // 2 * 30
    expect(result.details[1].cost).toBe(150); // 3 * 50
  });

  it('should calculate the total cost for Hardware type', () => {
    const order = {
      items: [
        { materialType: 'Hardware', category: 'Hinges', subcategory: 'Intermat', quantity: 4 },
        { materialType: 'Hardware', category: 'Hinges', subcategory: 'Inner', quantity: 2 }
      ]
    };

    const result = service.calculateOrder(order);
    expect(result.totalCost).toEqual(38); // 4 * 5 + 2 * 6
    expect(result.details.length).toBe(2);
    expect(result.details[0].cost).toBe(20); // 4 * 5
    expect(result.details[1].cost).toBe(12); // 2 * 6
  });

  it('should calculate the total cost for Transport type', () => {
    const order = {
      items: [
        { materialType: 'Transport', quantity: 5 }
      ]
    };

    const result = service.calculateOrder(order);
    expect(result.totalCost).toEqual(50); // 5 * 10
    expect(result.details.length).toBe(1);
    expect(result.details[0].cost).toBe(50); // 5 * 10
  });

  it('should calculate the total cost for Work type', () => {
    const order = {
      items: [
        { materialType: 'Work', quantity: 3 }
      ]
    };

    const result = service.calculateOrder(order);
    expect(result.totalCost).toEqual(450); // 3 * 150
    expect(result.details.length).toBe(1);
    expect(result.details[0].cost).toBe(450); // 3 * 150
  });

  it('should return zero cost for unknown material type', () => {
    const order = {
      items: [
        { materialType: 'Unknown', category: 'Unknown', subcategory: 'Unknown', quantity: 5 }
      ]
    };

    const result = service.calculateOrder(order);
    expect(result.totalCost).toEqual(0);
    expect(result.details.length).toBe(1);
    expect(result.details[0].cost).toBe(0);
  });
});
