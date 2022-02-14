import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, ValidateNested } from 'class-validator';
import { IsCNPJ } from 'src/stores/decorators/IsCNPJ.decorator';
import { Address } from 'src/stores/entities/address';

export class CreateStoreDTO {
  @IsString()
  name: string;

  @IsCNPJ()
  @IsString()
  cnpj: string;

  @IsEmail()
  email: string;

  @IsString({ each: true })
  phones: string[];

  @ValidateNested()
  @IsObject()
  @Type(() => Address)
  address: Address;
}
