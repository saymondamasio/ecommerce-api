import { Address } from 'src/customers/entities/address';

export class CreateCustomerBO {
  name: string;
  cpf: string;
  phones: string[];
  address: Address;
  user_id: string;
  birth_date: Date;
}
