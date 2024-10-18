import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL = "https://api.escuelajs.co/api/v1/products"

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL).pipe(
      map(products => products.map(product => {
        if (Array.isArray(product.images)) {
          product.images = product.images.map(img => {
            try {
              return JSON.parse(img);
            } catch (e) {
              return img;
            }
          }).flat()
        }
        return product;
      }))
    );
  }


  listByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL).pipe(
      map(products => products.filter(product => product.category?.name === category).map(product => {
        if (Array.isArray(product.images)) {
          product.images = product.images.map(img => {
            try {
              return JSON.parse(img);
            } catch (e) {
              return img;
            }
          }).flat()
        }
        return product;
      }))
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`);
  }

}