import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { PaymentsRepository } from '../repositories/payments.repository';

@Injectable()
export class FindPaymentBySecretService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async execute(client_secret_stripe: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      client_secret_stripe,
    });

    console.log('Pagamento ' + payment, client_secret_stripe);

    return payment;
  }
}
