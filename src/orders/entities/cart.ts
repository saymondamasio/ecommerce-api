import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class Cart {
  @IsUUID()
  product_id: string;

  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsNumber()
  @IsPositive()
  unit_price: number;
}
