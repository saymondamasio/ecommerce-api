import { Address } from 'src/deliveries/entities/address';
import { TypeDelivery } from 'src/deliveries/entities/type-delivery.enum';
import { CartItem } from 'src/orders/entities/cart-item';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';

export class CreateOrderBO {
  user_id: string;
  cart: CartItem[];
  delivery: {
    address: Address;
    type: TypeDelivery;
    cost: number;
    deadline: Date;
  };
  payment: {
    amount: number;
    status: StatusPayment;
  };
}
