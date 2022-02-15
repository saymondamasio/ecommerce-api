import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidateStoreGuard } from 'src/auth/guards/validate-store.guard';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enums/role.enum';
import { CreateCustomerService } from '../services/create-customers.service';
import { ListCustomersService } from '../services/list-customers.service';
import { ShowCustomerService } from '../services/show-customers.service';
import { createCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
@UseInterceptors(ClassSerializerInterceptor)
export class CustomersController {
  constructor(
    private listCustomers: ListCustomersService,
    private showCustomer: ShowCustomerService,
    private createCustomer: CreateCustomerService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, ValidateStoreGuard, RolesGuard)
  @Get()
  async index(@Query('store_id') store_id: string) {
    return this.listCustomers.execute(store_id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, ValidateStoreGuard, RolesGuard)
  @Get(':id')
  async show(@Query('store_id') store_id: string, @Param('id') id: string) {
    return this.showCustomer.execute({ store_id, customer_id: id });
  }

  @Roles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, ValidateStoreGuard, RolesGuard)
  @Get('me')
  async showSelfCustomer(
    @CurrentUser() user: User,
    @Query('store_id') store_id: string,
  ) {
    return this.showCustomer.execute({ store_id, user_id: user.id });
  }

  @UseGuards(JwtAuthGuard, ValidateStoreGuard)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createCustomerDTO: createCustomerDTO,
    @Query('store_id') store_id: string,
  ) {
    return this.createCustomer.execute({
      store_id,
      user_id: user.id,
      ...createCustomerDTO,
    });
  }
}
