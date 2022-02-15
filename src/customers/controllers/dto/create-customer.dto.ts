import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Address } from 'src/customers/entities/address';
import { IsCPF } from 'src/stores/decorators/IsCPF.decorator';

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
