import { Injectable } from '@angular/core';
import { MaterialsService } from './materials.service';
import { OrderDetail } from '../models/order-detail.model';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private materialsData: any;

  constructor(private materialsService: MaterialsService) {
    // Load material data when creating the service.
    this.materialsService.getMaterials().subscribe((data) => {
      this.materialsData = data;
    });
  }

  calculateOrder(order: any): { totalCost: number; details: OrderDetail[] } {
    let totalCost : number = 0;
    const details : OrderDetail[] = [];

    order.items.forEach((item: any) => {
      const itemCost = this.calculateItemCost(item);
      totalCost += itemCost;

      // Add detailed information about the order item.
      details.push({
        materialType: item.materialType,
        category: item.category,
        subcategory: item.subcategory,
        quantity: item.quantity,
        cost: itemCost,
      });
    });

    return { totalCost, details };
  }

  private calculateItemCost(item: any): number {
    const { materialType, category, subcategory, quantity } = item;

    // Handling of special types (Transport, Work).
    if (materialType === 'Transport') {
      const pricePerKilometer = this.materialsData.types.find(
        (type: any) => type.type === 'Transport'
      )?.pricePerKilometer || 0;
      return pricePerKilometer * quantity;
    }

    if (materialType === 'Work') {
      const pricePerDay = this.materialsData.types.find(
        (type: any) => type.type === 'Work'
      )?.pricePerDay || 0;
      return pricePerDay * quantity;
    }

    // Handling of materials and hardware.
    const typeData = this.materialsData.types.find(
      (type: any) => type.type === materialType
    );

    if (!typeData) {
      return 0;
    }

    const categoryData = typeData.categories?.find(
      (cat: any) => cat.name === category
    );

    if (!categoryData) {
      return 0;
    }

    if (materialType === 'Material') {
      const subcategoryData = categoryData.subcategories?.find(
        (sub: any) => sub.name === subcategory
      );

      const pricePerSquareMeter = subcategoryData?.pricePerSquareMeter || 0;
      return pricePerSquareMeter * quantity;
    }

    if (materialType === 'Hardware') {
      const subcategoryData = categoryData.subcategories?.find(
        (sub: any) => sub.name === subcategory
      );

      const pricePerPiece = subcategoryData?.pricePerPiece || 0;
      return pricePerPiece * quantity;
    }

    return 0;
  }
}
