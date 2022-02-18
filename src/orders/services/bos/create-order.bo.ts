import { Address } from 'src/deliveries/entities/address';
import { TypeDelivery } from 'src/deliveries/entities/type-delivery.enum';
import { Cart } from 'src/orders/entities/cart';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';

export class CreateOrderBO {
  user_id: string;
  cart: Cart[];
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
