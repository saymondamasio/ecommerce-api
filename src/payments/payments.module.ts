import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentsRepository } from './repositories/payments.repository';
import { CreateIntentPaymentService } from './services/create-intent-payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentsRepository]), SharedModule],
  controllers: [PaymentsController],
  providers: [CreateIntentPaymentService],
})
export class PaymentsModule {}
