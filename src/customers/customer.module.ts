import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersController } from './controllers/customers.controller';
import { CustomersRepository } from './repositories/customers.repository';
import { CreateCustomerService } from './services/create-customers.service';
import { ListCustomersService } from './services/list-customers.service';
import { ShowCustomerService } from './services/show-customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersRepository])],
  controllers: [CustomersController],
  providers: [ListCustomersService, CreateCustomerService, ShowCustomerService],
})
export class CustomerModule {}
