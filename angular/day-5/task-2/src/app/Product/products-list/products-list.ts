import { Component, OnInit } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../Models/product';

@Component({
  selector: 'ProductsList',
  imports: [ProductCard],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  products: Product[] = [];

  async getProductsFromDummyJson() {
    const data = await fetch('https://dummyjson.com/products');
    const productsData = await data.json(); // Get the JSON object
    this.products = productsData.products; // Access the 'products' array within the response

    console.log(this.products);
  }

  ngOnInit(): void {
    this.getProductsFromDummyJson();
  }
}
