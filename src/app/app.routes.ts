import { Routes } from '@angular/router';
// import { RouterModule, Routes } from '@angular/router';
// import { OrderFormComponent } from './components/order-form/order-form.component';
// import { CalculationResultComponent } from './components/calculation-result/calculation-result.component';


export const routes: Routes = [
  // { path: '', redirectTo: '/order', pathMatch: 'full' }, // перенаправлення на головну сторінку
  // { path: 'order', component: OrderFormComponent }, // сторінка для введення параметрів
  // { path: 'result', component: CalculationResultComponent } // сторінка для результатів

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
