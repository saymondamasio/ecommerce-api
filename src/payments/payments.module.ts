import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentsRepository } from './repositories/payments.repository';
import { CreateIntentPaymentService } from './services/create-intent-payment.service';
import { FindPaymentBySecretService } from './services/find-payment-by-secret.service';
import { UpdatePaymentService } from './services/update-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentsRepository]), SharedModule],
  controllers: [PaymentsController],
  providers: [
    CreateIntentPaymentService,
    UpdatePaymentService,
    FindPaymentBySecretService,
  ],
})
export class PaymentsModule {}
