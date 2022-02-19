import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CartItem } from 'src/orders/entities/cart-item';
import { StatusPayment } from 'src/payments/entities/status-payment.enum';
import { Address } from 'src/shipments/entities/address';
import { Shipping } from 'src/shipments/entities/shipping.entity';
import { TypeShipping } from 'src/shipments/entities/type-shipping.enum';

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

  @IsEnum(TypeShipping)
  type: TypeShipping;

  @IsNumber()
  cost: number;

  @IsDateString()
  deadline: Date;
}

export class CreateOrderDTO {
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  cart: CartItem[];

  @IsObject()
  @ValidateNested()
  @Type(() => Shipping)
  shipping: Shipping;

  @IsObject()
  @ValidateNested()
  @Type(() => Payment)
  payment: Payment;
}
