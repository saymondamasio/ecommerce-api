import { Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import StripeService from 'src/shared/services/stripe.service';
import { PaymentsRepository } from '../repositories/payments.repository';

@Injectable()
export class CreateIntentPaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsRepository: PaymentsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(paymentId: string): Promise<{ client_secret: string }> {
    const payment = await this.paymentsRepository.findOne(paymentId, {
      relations: ['order'],
    });

    const cart = payment.order.cart;

    const products_ids = cart.map((item) => item.product_id);

    const products = await this.productsRepository.findByIds(products_ids);

    const amount = cart.reduce((acc, cart_item) => {
      const product = products.find(
        (product) => product.id === cart_item.product_id,
      );
      return product.price * cart_item.quantity + acc;
    }, 0);

    const intentPaymentStripe = await this.stripeService.createPaymentIntent(
      amount,
    );

    payment.client_secret_stripe = intentPaymentStripe.client_secret;

    this.paymentsRepository.save(payment);

    return { client_secret: intentPaymentStripe.client_secret };
  }
}
