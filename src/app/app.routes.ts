import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail/product-detail.page').then(c => c.ProductDetailPage) }
];
