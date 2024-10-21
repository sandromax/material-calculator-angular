import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full',
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./components/order-form/order-form.component').then(
        (m) => m.OrderFormComponent
      ),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./components/calculation-result/calculation-result.component').then(
        (m) => m.CalculationResultComponent
      ),
  },
];
