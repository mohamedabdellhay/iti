import { Component, OnInit, signal } from '@angular/core';
import { ProductsList } from './Product/products-list/products-list';
import { CartService } from './_services/cart-service';

@Component({
  selector: 'app-root',
  imports: [ProductsList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  cartCount: number = 0;
  protected readonly title = signal('task-2');
  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }
}
