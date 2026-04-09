import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  add(product: Product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find((p: any) => p.id === product.id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
