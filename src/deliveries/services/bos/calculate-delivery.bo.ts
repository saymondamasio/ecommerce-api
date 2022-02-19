import { CartItem } from 'src/orders/entities/cart-item';

export class CalculateDeliveryBO {
  zip_code: string;
  cart: CartItem[];
}
