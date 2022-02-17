import {
  BadRequestException,
  Controller,
  Headers,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import StripeService from 'src/shared/services/stripe.service';
import { default as Stripe } from 'stripe';
import { StatusPayment } from '../entities/status-payment.enum';
import RequestWithRawBody from '../interfaces/request-with-raw-body.interface';
import { CreateIntentPaymentService } from '../services/create-intent-payment.service';
import { FindPaymentBySecretService } from '../services/find-payment-by-secret.service';
import { UpdatePaymentService } from '../services/update-payment.service';

const relevantEvents = new Set([
  'payment_intent.succeeded',
  'charge.succeeded',
  'charge.refunded',
]);

@Controller('payments')
export class PaymentsController {
  constructor(
    private createIntentPaymentService: CreateIntentPaymentService,
    private updatePaymentService: UpdatePaymentService,
    private findPaymentBySecretService: FindPaymentBySecretService,
    private stripeService: StripeService,
    private configService: ConfigService,
  ) {}

  @Post('create-intent/:payment_id')
  async createIntentPayment(@Param('payment_id') payment_id: string) {
    return this.createIntentPaymentService.execute(payment_id);
  }

  @Post('stripe/webhooks')
  async stripeWebhooks(
    @Headers('stripe-signature') signature: string,
    @Req() req: RequestWithRawBody,
  ) {
    let event: Stripe.Event;

    try {
      event = this.stripeService.getEvent(
        req.rawBody,
        signature,
        this.configService.get('STRIPE_WEBHOOK_SECRET'),
      );
    } catch (err) {
      console.log(err);

      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (relevantEvents.has(event.type)) {
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object as Stripe.PaymentIntent;

          const payment = await this.findPaymentBySecretService.execute(
            paymentIntent.client_secret,
          );

          this.updatePaymentService.execute({
            payment_id: payment.id,
            status: StatusPayment.PAID,
          });

          break;
        case 'charge.refunded':
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    }

    return {
      received: true,
    };
  }
}
