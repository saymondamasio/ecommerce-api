import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { DeliveriesController } from './controllers/deliveries.controller';
import { DeliveriesRepository } from './repositories/deliveries.repository';
import { CalculateDeliveryService } from './services/calculate-delivery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveriesRepository, ProductsRepository]),
  ],
  controllers: [DeliveriesController],
  providers: [CalculateDeliveryService],
  exports: [CalculateDeliveryService],
})
export class DeliveriesModule {}
