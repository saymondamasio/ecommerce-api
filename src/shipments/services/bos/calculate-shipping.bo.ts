import { CartItem } from 'src/orders/entities/cart-item';

export class CalculateShippingBO {
  zip_code: string;
  cart: CartItem[];
}
