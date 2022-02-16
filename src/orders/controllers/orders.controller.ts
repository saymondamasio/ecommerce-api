import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidateStoreGuard } from 'src/auth/guards/validate-store.guard';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/enums/role.enum';
import { CreateOrderService } from '../services/create-order.service';
import { CreateOrderDTO } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @UseGuards(JwtAuthGuard, ValidateStoreGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @Post()
  create(
    @CurrentUser() user: User,
    @Query('store_id') store_id: string,
    @Body() createOrderDTO: CreateOrderDTO,
  ) {
    return this.createOrderService.execute({
      user_id: user.id,
      store_id,
      ...createOrderDTO,
    });
  }
}
