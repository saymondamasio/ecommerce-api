import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Address } from 'src/deliveries/entities/address';
import { TypeDelivery } from 'src/deliveries/entities/type-delivery.enum';
import { Cart } from 'src/orders/entities/cart';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';

class Payment {
  @IsNumber()
  amount: number;

  @IsEnum(StatusPayment)
  status: StatusPayment;
}

class Delivery {
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsEnum(TypeDelivery)
  type: TypeDelivery;

  @IsNumber()
  cost: number;

  @IsDateString()
  deadline: Date;
}

export class CreateOrderDTO {
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => Cart)
  cart: Cart[];

  @IsObject()
  @ValidateNested()
  @Type(() => Delivery)
  delivery: Delivery;

  @IsObject()
  @ValidateNested()
  @Type(() => Payment)
  payment: Payment;
}
