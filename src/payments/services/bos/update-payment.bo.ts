import { StatusPayment } from 'src/payments/entities/status-payment.enum';

export class UpdatePaymentBO {
  payment_id: string;
  status: StatusPayment;
}
