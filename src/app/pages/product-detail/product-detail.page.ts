import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe],
  templateUrl: './product-detail.page.html',
  styleUrl: './product-detail.page.scss',
})
export class ProductDetailPage {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => this.productService.getProductById(id!)),
  );

  addToCart(product: Product) {
    this.cartService.add(product);
    alert('Producto agregado al carrito');
  }
}
