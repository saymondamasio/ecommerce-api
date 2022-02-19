import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { ShipmentsController } from './controllers/shipiments.controller';
import { ShipmentsRepository } from './repositories/shipments.repository';
import { CalculateShippingService } from './services/calculate-shipping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShipmentsRepository, ProductsRepository]),
  ],
  controllers: [ShipmentsController],
  providers: [CalculateShippingService],
  exports: [CalculateShippingService],
})
export class ShipmentsModule {}
