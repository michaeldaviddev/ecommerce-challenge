import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product';
import { NgOptimizedImage } from "@angular/common";
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  private cartService = inject(CartService);

  addToCart(product: Product) {
    this.cartService.add(product);
    alert('Producto agregado al carrito');
  }
}
