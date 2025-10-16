import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();
  cart: { id: number; title: string }[] = [];

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = storedCart;
    this.cartCountSource.next(this.cart.length);
  }

  count(): number {
    return this.cart.length;
  }

  addToCart(cartItem: { id: number; title: string }) {
    this.cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.cart));

    this.cartCountSource.next(this.cart.length);
  }

  getAll() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    this.cartCountSource.next(0);
  }
}
