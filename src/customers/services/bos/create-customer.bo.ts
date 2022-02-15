import { Address } from 'src/customers/entities/address';

export class CreateCustomerBO {
  store_id: string;
  name: string;
  cpf: string;
  phones: string[];
  address: Address;
  user_id: string;
}