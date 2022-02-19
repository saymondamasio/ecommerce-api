import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomersRepository } from 'src/customers/repositories/customers.repository';
import { TypeDelivery } from 'src/deliveries/entities/type-delivery.enum';
import { DeliveriesRepository } from 'src/deliveries/repositories/deliveries.repository';
import { CalculateDeliveryService } from 'src/deliveries/services/calculate-delivery.service';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';
import { PaymentsRepository } from 'src/payments/repositories/payments.repository';
import { Product } from 'src/products/entities/product.entity';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { compareInDays } from 'src/utils/date';
import { Order } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { CreateOrderBO } from './bos/create-order.bo';

const correiosCode = {
  [TypeDelivery.PAC]: '04510',
  [TypeDelivery.SEDEX]: '04014',
  [TypeDelivery.SEDEX_10]: '04804',
  [TypeDelivery.SEDEX_12]: '04782',
  [TypeDelivery.SEDEX_HOJE]: '04804',
};

@Injectable()
export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
    private customersRepository: CustomersRepository,
    private paymentsRepository: PaymentsRepository,
    private deliveriesRepository: DeliveriesRepository,
    private calculateDelivery: CalculateDeliveryService,
  ) {}

  async execute({ cart, delivery, user_id }: CreateOrderBO): Promise<Order> {
    //verificar estoque

    const errors: string[] = [];
    const products: Product[] = [];
    let amount = 0;

    for await (const cart_item of cart) {
      const product = await this.productsRepository.findOne(
        cart_item.product_id,
      );

      products.push(product);

      amount += product.price * cart_item.quantity;

      if (product.stock < cart_item.quantity) {
        errors.push(`${product.title} - Não há estoque suficiente`);
      }
    }

    const deliveryOptions = await this.calculateDelivery.execute({
      zip_code: delivery.address.zip_code,
      cart,
    });

    const deliveryOption = deliveryOptions.find(
      (option) => option.type === delivery.type,
    );

    amount += deliveryOption.cost;

    if (deliveryOption.cost !== delivery.cost) {
      throw new BadRequestException('O valor da entrega não é o esperado');
    }

    if (compareInDays(deliveryOption.deadline, delivery.deadline) !== 0) {
      throw new BadRequestException(
        'A data limite de entrega não é a esperada',
      );
    }

    const customer = await this.customersRepository.findOne({
      user_id,
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const deliveryCreated = this.deliveriesRepository.create({
      address: delivery.address,
      deadline: delivery.deadline,
      cost: delivery.cost,
      type: delivery.type,
    });

    await this.deliveriesRepository.save(deliveryCreated);

    const paymentCreated = this.paymentsRepository.create({
      amount,
      status: StatusPayment[StatusPayment.PENDING],
    });
    await this.paymentsRepository.save(paymentCreated);

    const order = this.ordersRepository.create({
      customer_id: customer.id,
      cart,
      delivery_id: deliveryCreated.id,
      payment_id: paymentCreated.id,
    });

    await this.ordersRepository.save(order);

    for await (const cartItem of cart) {
      const product = await this.productsRepository.findOne(
        cartItem.product_id,
      );

      await this.productsRepository.update(
        {
          id: cartItem.product_id,
        },
        {
          stock: product.stock - cartItem.quantity,
        },
      );
    }

    return order;
  }
}
