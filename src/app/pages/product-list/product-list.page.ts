import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AsyncPipe } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, ProductCardComponent],
  templateUrl: './product-list.page.html',
  styleUrl: './product-list.page.scss',
})
export class ProductListPage {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  products$ = this.productService.getProducts()
}
