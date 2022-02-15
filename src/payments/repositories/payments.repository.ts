import { EntityRepository, Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';

@EntityRepository(Payment)
export class PaymentsRepository extends Repository<Payment> {}
