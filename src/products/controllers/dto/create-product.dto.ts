import { IsNumber, IsString } from 'class-validator';
import { IsSKU } from 'src/shared/decorators/is-sku.decorator';

export class CreateProductDTO {
  @IsSKU()
  sku: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  promotional_price: number;

  @IsString()
  category_id: string;
}
