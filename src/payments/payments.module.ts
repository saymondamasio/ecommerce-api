import { Module } from '@nestjs/common';
import { PaymentsController } from './controllers/payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [],
})
export class PaymentsModule {}
