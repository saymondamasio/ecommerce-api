import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_API_KEY'), {
      apiVersion: '2020-08-27',
    });
  }

  async createPaymentIntent(
    amount: number,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return this.stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  getEvent(
    payload: string | Buffer,
    header: string | Buffer,
    secret: string,
  ): Stripe.Event {
    return this.stripe.webhooks.constructEvent(payload, header, secret);
  }
}
