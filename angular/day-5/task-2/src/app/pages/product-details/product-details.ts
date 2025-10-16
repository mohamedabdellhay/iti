import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/product';
import { CartService } from '../../_services/cart-service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product!: Product;
  private route = inject(ActivatedRoute);

  productId = computed(() => (this.route.snapshot.params['id'] as string) || 'default');

  source = computed(() => (this.route.snapshot.queryParams['source'] as string) || 'N/A');

  constructor(public cartService: CartService) {
    console.log('Product ID:', this.productId());
    console.log('Source:', this.source());
  }

  async getProductsFromDummyJson(id: string) {
    const data = await fetch(`https://dummyjson.com/products/${id}`);
    const productData = await data.json(); // Get the JSON object
    this.product = productData; // Access the 'products' array within the response

    console.log(this.product);
  }

  ngOnInit(): void {
    this.getProductsFromDummyJson(this.productId());
  }

  addToCart(pro: { id: number; title: string }) {
    this.cartService.addToCart(pro);
  }
}
