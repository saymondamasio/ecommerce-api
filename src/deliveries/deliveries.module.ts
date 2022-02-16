import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveriesController } from './controllers/deliveries.controller';
import { DeliveriesRepository } from './repositories/deliveries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveriesRepository])],
  controllers: [DeliveriesController],
  providers: [],
})
export class DeliveriesModule {}
