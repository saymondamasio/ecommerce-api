import { Injectable } from '@nestjs/common';
import { Role } from 'src/users/enums/role.enum';
import { UsersRepository } from 'src/users/repositories/users.repository';
import Customer from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';
import { CreateCustomerBO } from './bos/create-customer.bo';

@Injectable()
export class CreateCustomerService {
  constructor(
    private customersRepository: CustomersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    address,
    cpf,
    name,
    phones,
    store_id,
    user_id,
    birth_date,
  }: CreateCustomerBO): Promise<Customer> {
    const customerExists = await this.customersRepository.findOne({ user_id });

    if (customerExists) {
      throw new Error('Customer already exists');
    }

    const customer = this.customersRepository.create({
      address,
      cpf,
      name,
      phones,
      store_id,
      user_id,
      birth_date,
    });

    await this.customersRepository.save(customer);

    await this.usersRepository.update(user_id, {
      roles: [Role.CUSTOMER],
    });

    return customer;
  }
}
