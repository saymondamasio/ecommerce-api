import { IsNumber, IsPositive, IsString } from 'class-validator';
import { IsSKU } from 'src/shared/decorators/is-sku.decorator';

export class CreateProductDTO {
  @IsSKU()
  sku: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsPositive()
  @IsNumber()
  stock: number;

  @IsPositive()
  @IsNumber()
  price: number;

  @IsPositive()
  @IsNumber()
  height: number;

  @IsPositive()
  @IsNumber()
  width: number;

  @IsNumber()
  @IsPositive()
  length: number;

  @IsPositive()
  @IsNumber()
  weight: number;

  @IsPositive()
  @IsNumber()
  promotional_price: number;

  @IsString()
  category_id: string;
}
