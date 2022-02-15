import { Injectable } from '@nestjs/common';
import Customer from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';
import { CreateCustomerBO } from './bos/create-customer.bo';

@Injectable()
export class CreateCustomerService {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    address,
    cpf,
    name,
    phones,
    store_id,
    user_id,
  }: CreateCustomerBO): Promise<Customer> {
    const customer = this.customersRepository.create({
      address,
      cpf,
      name,
      phones,
      store_id,
      user_id,
    });

    await this.customersRepository.save(customer);

    return customer;
  }
}
