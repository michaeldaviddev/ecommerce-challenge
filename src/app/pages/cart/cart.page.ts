import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss',
})
export class CartPage {
  cart: any[] = [];

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  get totalItems(): number {
    return this.cart.reduce((s, p) => s + p.quantity, 0);
  }

  get total(): number {
    return this.cart.reduce((s, p) => s + p.price * p.quantity, 0);
  }
}
