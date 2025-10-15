import { Component } from '@angular/core';
import { ProductImage } from './product-image/product-image';

@Component({
  selector: 'productCard',
  imports: [ProductImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {}
