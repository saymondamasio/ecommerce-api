import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { PaymentsRepository } from '../repositories/payments.repository';
import { UpdatePaymentBO } from './bos/update-payment.bo';

@Injectable()
export class UpdatePaymentService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async execute({ payment_id, status }: UpdatePaymentBO): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne(payment_id);

    payment.status = status;

    await this.paymentsRepository.save(payment);

    return payment;
  }
}
