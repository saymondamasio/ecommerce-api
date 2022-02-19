import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CartItem {
  @IsUUID()
  product_id: string;

  @IsPositive()
  @IsNumber()
  quantity: number;
}
