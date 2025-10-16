import { Routes } from '@angular/router';
import { ProductsList } from './Product/products-list/products-list';
import { ProductDetails } from './pages/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    component: ProductsList,
    title: 'products Page',
  },
  {
    path: 'product/:id',
    component: ProductDetails,
    title: 'product title',
  },
];
