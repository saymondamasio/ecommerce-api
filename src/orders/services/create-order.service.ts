import { BadRequestException, Injectable } from '@nestjs/common';
import { calcularPrecoPrazo, PrecoPrazoEvent } from 'correios-brasil';
import { CustomersRepository } from 'src/customers/repositories/customers.repository';
import { TypeDelivery } from 'src/deliveries/entities/type-delivery.enum';
import { DeliveriesRepository } from 'src/deliveries/repositories/deliveries.repository';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';
import { PaymentsRepository } from 'src/payments/repositories/payments.repository';
import { Product } from 'src/products/entities/product.entity';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { calculateBox } from 'src/utils/calculateBox';
import { addDays, compareInDays } from 'src/utils/date';
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
  ) {}

  async execute({
    cart,
    delivery,
    payment,
    store_id,
    user_id,
  }: CreateOrderBO): Promise<Order> {
    //verificar estoque

    const error: string[] = [];
    let weight = 0;
    const products: Product[] = [];
    let amount = 0;

    for await (const cart_item of cart) {
      const product = await this.productsRepository.findOne(
        cart_item.product_id,
      );

      products.push(product);

      weight += product.weight * cart_item.quantity;
      amount += product.price * cart_item.quantity;

      if (product.stock < cart_item.quantity) {
        error.push(`${product.title} - Não há estoque suficiente`);
      }
    }

    if (error.length > 0) {
      throw new BadRequestException(error);
    }

    const result = calculateBox(
      products.map((product) => ({
        height: product.height,
        length: product.length,
        width: product.width,
        weight: product.weight,
      })),
    );

    //verificar entrega
    const args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '68600000',
      sCepDestino: delivery.address.zip_code,
      nVlPeso: String(weight / 1000), //em gramas
      nCdFormato: '1',
      nVlComprimento: String(result.comprimento),
      nVlAltura: String(result.altura),
      nVlLargura: String(result.largura),
      nCdServico: [
        correiosCode[TypeDelivery.PAC],
        correiosCode[TypeDelivery.SEDEX],
      ], //Array com os códigos de serviço
      nVlDiametro: '0',
      nValorDeclarado: String(amount / 100), //em reais
    };

    const resultCorreios = (await calcularPrecoPrazo(
      args,
    )) as unknown as Array<PrecoPrazoEvent>;

    if (resultCorreios && resultCorreios.length > 0) {
      resultCorreios.forEach((deliveryType) => {
        if (deliveryType.Codigo === correiosCode[delivery.type]) {
          if (deliveryType.Erro !== '0') {
            throw new BadRequestException(deliveryType.MsgErro);
          }

          const deliveryCost =
            Number(deliveryType.Valor.replace(',', '.')) * 100;

          const deadline = addDays(Number(deliveryType.PrazoEntrega));

          amount += deliveryCost;

          if (deliveryCost !== delivery.cost) {
            throw new BadRequestException(
              'O valor da entrega não é o esperado',
            );
          }

          if (deliveryCost !== delivery.cost) {
            throw new BadRequestException(
              'O valor da entrega não é o esperado',
            );
          }

          if (compareInDays(deadline, delivery.deadline) !== 0) {
            throw new BadRequestException(
              'A data limite de entrega não é a esperada',
            );
          }
        }
      });
    }

    const customer = await this.customersRepository.findOne({
      user_id,
    });

    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    console.log({
      store_id,
      address: delivery.address,
      deadline: delivery.deadline,
      cost: delivery.cost,
      type: delivery.type,
    });

    const deliveryCreated = this.deliveriesRepository.create({
      store_id,
      address: delivery.address,
      deadline: delivery.deadline,
      cost: delivery.cost,
      type: delivery.type,
    });

    await this.deliveriesRepository.save(deliveryCreated);

    const paymentCreated = this.paymentsRepository.create({
      amount,
      status: StatusPayment[StatusPayment.PENDING],
      store_id,
    });
    await this.paymentsRepository.save(paymentCreated);

    console.log(customer, paymentCreated, deliveryCreated);

    const order = this.ordersRepository.create({
      customer_id: customer.id,
      store_id,
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
