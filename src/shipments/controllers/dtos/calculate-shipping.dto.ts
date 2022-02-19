import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { CartItem } from 'src/orders/entities/cart-item';

export class CalculateShippingDTO {
  @IsString()
  zip_code: string;
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  cart: CartItem[];
}
