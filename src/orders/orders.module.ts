import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersRepository } from 'src/customers/repositories/customers.repository';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { DeliveriesRepository } from 'src/deliveries/repositories/deliveries.repository';
import { PaymentsRepository } from 'src/payments/repositories/payments.repository';
import { ProductsRepository } from 'src/products/repositories/products.repository';
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
      DeliveriesRepository,
    ]),
    DeliveriesModule,
  ],
  controllers: [OrdersController],
  providers: [CreateOrderService],
})
export class OrdersModule {}
