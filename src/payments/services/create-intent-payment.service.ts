import { Injectable } from '@nestjs/common';
import StripeService from 'src/shared/services/stripe.service';
import { PaymentsRepository } from '../repositories/payments.repository';

@Injectable()
export class CreateIntentPaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly paymentsRepository: PaymentsRepository,
  ) {}

  async execute(paymentId: string): Promise<{ client_secret: string }> {
    const payment = await this.paymentsRepository.findOne(paymentId, {
      relations: ['order'],
    });

    console.log(payment);

    const cart = payment.order.cart;

    const amount = cart.reduce(
      (acc, cart_item) => cart_item.unit_price * cart_item.quantity + acc,
      0,
    );

    const intentPaymentStripe = await this.stripeService.createPaymentIntent(
      amount,
    );

    return { client_secret: intentPaymentStripe.client_secret };
  }
}
