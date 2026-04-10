import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./pages/product-list/product-list.page').then(c => c.ProductListPage) },
  { path: 'product/:id', loadComponent: () => import('./pages/product-detail/product-detail.page').then(c => c.ProductDetailPage) },
  { path: 'cart', loadComponent: () => import('./pages/cart/cart.page').then(c => c.CartPage) }
];
