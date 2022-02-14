import { Address } from 'src/stores/entities/address';

export class UpdateStoreBO {
  id: string;
  name: string;
  address: Address;
  cnpj: string;
  email: string;
  phones: string[];
}
