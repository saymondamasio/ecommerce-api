import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async index() {
    return this.listCustomers.execute();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async show(@Param('id') id: string) {
    return this.showCustomer.execute({ customer_id: id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async showSelfCustomer(@CurrentUser() user: User) {
    return this.showCustomer.execute({ user_id: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createCustomerDTO: createCustomerDTO,
  ) {
    return this.createCustomer.execute({
      user_id: user.id,
      ...createCustomerDTO,
    });
  }
}
