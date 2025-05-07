import { Product } from '../types';

export const defaultProducts: Product[] = [
  {
    id: 'product-1',
    name: 'Produit Standard',
    price: 3500,
    isSelected: true,
  },
  {
    id: 'product-2',
    name: 'Produit Premium',
    price: 5000,
    isSelected: false,
  },
  {
    id: 'product-3',
    name: 'Produit Luxe',
    price: 7000,
    isSelected: false,
  },
];