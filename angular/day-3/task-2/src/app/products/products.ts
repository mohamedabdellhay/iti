import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: {
    name: string;
    price: number;
    status: string;
    description: string;
    rating: number;
    button: string;
    image: string;
  }[] = [
    {
      name: 'Wireless Earbuds, IPX8',
      price: 89.0,
      status: 'In stock',
      description: 'Organic Cotton, fairtrade certified',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/wireless_earbuds_ipx8.jpg',
    },
    {
      name: 'AirPods Max',
      price: 559.0,
      status: 'Out of stock',
      description: 'A perfect balance of high-fidelity audio',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/airpods_max.jpg',
    },
    {
      name: 'Bose BT Earphones',
      price: 289.0,
      status: 'Out of stock',
      description: 'Table with air purifier, stained venner/black',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/bose_bt_earphones.jpg',
    },
    {
      name: 'VIVEFOX Headphones',
      price: 39.0,
      status: 'In stock',
      description: 'Wired Stereo Headsets With Mic',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/vivefox_headphones.jpg',
    },
    {
      name: 'Wireless Earbuds, IPX8',
      price: 89.0,
      status: 'Out of stock',
      description: 'Organic Cotton, fairtrade certified',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/wireless_earbuds_ipx8.jpg',
    },
    {
      name: 'AirPods Max',
      price: 559.0,
      status: 'In stock',
      description: 'A perfect balance of high-fidelity audio',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/airpods_max.jpg',
    },
    {
      name: 'Bose BT Earphones',
      price: 289.0,
      status: 'In stock',
      description: 'Table with air purifier, stained venner/black',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/bose_bt_earphones.jpg',
    },
    {
      name: 'VIVEFOX Headphones',
      price: 39.0,
      status: 'In stock',
      description: 'Wired Stereo Headsets With Mic',
      rating: 5,
      button: 'Add to Cart',
      image: 'images/vivefox_headphones.jpg',
    },
  ];
}
