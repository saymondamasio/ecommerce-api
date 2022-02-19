import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersRepository } from 'src/customers/repositories/customers.repository';
import { PaymentsRepository } from 'src/payments/repositories/payments.repository';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { ShipmentsRepository } from 'src/shipments/repositories/shipments.repository';
import { ShipmentsModule } from 'src/shipments/shipments.module';
import { OrdersController } from './controllers/orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { CreateOrderService } from './services/create-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      ProductsRepository,
      CustomersRepository,
      PaymentsRepository,
      ShipmentsRepository,
    ]),
    ShipmentsModule,
  ],
  controllers: [OrdersController],
  providers: [CreateOrderService],
})
export class OrdersModule {}
