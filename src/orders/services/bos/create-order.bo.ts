import { CartItem } from 'src/orders/entities/cart-item';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';
import { Address } from 'src/shipments/entities/address';
import { TypeShipping } from 'src/shipments/entities/type-shipping.enum';

export class CreateOrderBO {
  user_id: string;
  cart: CartItem[];
  shipping: {
    address: Address;
    type: TypeShipping;
    cost: number;
    deadline: Date;
  };
  payment: {
    amount: number;
    status: StatusPayment;
  };
}
