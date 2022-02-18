import { Injectable } from '@nestjs/common';
import Customer from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';

@Injectable()
export class ListCustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(): Promise<Customer[]> {
    const customer = await this.customersRepository.find({
      relations: ['user'],
    });

    return customer;
  }
}
