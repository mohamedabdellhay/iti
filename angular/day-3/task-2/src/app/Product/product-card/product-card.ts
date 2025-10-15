import { Component, Input } from '@angular/core';
import { Product } from '../../Models/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../_services/cart-service';

@Component({
  selector: 'ProductCard',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  arrayOfStars: number[] = Array.from({ length: 5 });

  constructor(public cartService: CartService) {}

  addToCart(cartItem: { id: number; title: string }) {
    this.cartService.addToCart(cartItem);
    console.log(this.cartService.getAll());
  }
}
