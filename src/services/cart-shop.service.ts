import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartShopService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([])
  cart: Observable<CartItem[]> = this.cartSubject.asObservable()

  constructor() { }

  addProductToCart(product: Product): void {
    const currentCart = this.cartSubject.value;

    const existingCartItem = currentCart.find(item => item.product.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      currentCart.push({ product, quantity: 1 });
    }

    this.cartSubject.next([...currentCart]);
  }

  removeProductFromCart(product: Product): void {

    let currentCart = this.cartSubject.value;
    const cartItem = currentCart.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        currentCart = currentCart.filter(item => item.product.id !== product.id);
      }
    }

    this.cartSubject.next([...currentCart]);
  }
  clearCart(): void {
    this.cartSubject.next([]);
  }
}