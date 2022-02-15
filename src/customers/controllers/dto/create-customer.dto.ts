import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Address } from 'src/customers/entities/address';
import { IsCPF } from 'src/shared/decorators/is-cpf.decorator';

export class createCustomerDTO {
  @IsString()
  name: string;

  @IsString()
  @IsCPF()
  cpf: string;

  @IsString({ each: true })
  phones: string[];

  @ValidateNested()
  @IsObject()
  @Type(() => Address)
  address: Address;
}
