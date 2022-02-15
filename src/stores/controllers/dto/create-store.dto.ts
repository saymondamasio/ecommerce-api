import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, ValidateNested } from 'class-validator';
import { IsCNPJ } from 'src/shared/decorators/is-cnpj.decorator';
import { Address } from 'src/stores/entities/address';

export class UpdateStoreDTO {
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
