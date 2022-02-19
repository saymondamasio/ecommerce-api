import { BadRequestException, Injectable } from '@nestjs/common';
import { CustomersRepository } from 'src/customers/repositories/customers.repository';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';
import { PaymentsRepository } from 'src/payments/repositories/payments.repository';
import { Product } from 'src/products/entities/product.entity';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { TypeShipping } from 'src/shipments/entities/type-shipping.enum';
import { ShipmentsRepository } from 'src/shipments/repositories/shipments.repository';
import { CalculateShippingService } from 'src/shipments/services/calculate-shipping.service';
import { compareInDays } from 'src/utils/date';
import { Order } from '../entities/order.entity';
import { OrdersRepository } from '../repositories/orders.repository';
import { CreateOrderBO } from './bos/create-order.bo';

const correiosCode = {
  [TypeShipping.PAC]: '04510',
  [TypeShipping.SEDEX]: '04014',
  [TypeShipping.SEDEX_10]: '04804',
  [TypeShipping.SEDEX_12]: '04782',
  [TypeShipping.SEDEX_HOJE]: '04804',
};

@Injectable()
export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private productsRepository: ProductsRepository,
    private customersRepository: CustomersRepository,
    private paymentsRepository: PaymentsRepository,
    private shipmentsRepository: ShipmentsRepository,
    private calculateShipping: CalculateShippingService,
  ) {}

  async execute({ cart, shipping, user_id }: CreateOrderBO): Promise<Order> {
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

    const shippingOptions = await this.calculateShipping.execute({
      zip_code: shipping.address.zip_code,
      cart,
    });

    const shippingOption = shippingOptions.find(
      (option) => option.type === shipping.type,
    );

    amount += shippingOption.cost;

    if (shippingOption.cost !== shipping.cost) {
      throw new BadRequestException('O valor da entrega não é o esperado');
    }

    if (compareInDays(shippingOption.deadline, shipping.deadline) !== 0) {
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

    const shippingCreated = this.shipmentsRepository.create({
      address: shipping.address,
      deadline: shipping.deadline,
      cost: shipping.cost,
      type: shipping.type,
    });

    await this.shipmentsRepository.save(shippingCreated);

    const paymentCreated = this.paymentsRepository.create({
      amount,
      status: StatusPayment[StatusPayment.PENDING],
    });
    await this.paymentsRepository.save(paymentCreated);

    const order = this.ordersRepository.create({
      customer_id: customer.id,
      cart,
      shipping_id: shippingCreated.id,
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
