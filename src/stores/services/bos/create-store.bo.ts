import { Address } from 'src/stores/entities/address';

export class CreateStoreBO {
  name: string;
  address: Address;
  cnpj: string;
  email: string;
  phones: string[];
}
