import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient);

  private url = 'mock/products.json';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.id == id))
    );
  }
}
