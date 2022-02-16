import { Controller, Param, Post } from '@nestjs/common';
import { CreateIntentPaymentService } from '../services/create-intent-payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(private createIntentPaymentService: CreateIntentPaymentService) {}

  @Post('create-intent/:payment_id')
  async createIntentPayment(@Param('payment_id') payment_id: string) {
    return this.createIntentPaymentService.execute(payment_id);
  }
}
