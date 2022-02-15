import { Injectable } from '@nestjs/common';
import Customer from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';

@Injectable()
export class ListCustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async execute(store_id: string): Promise<Customer[]> {
    const store = await this.customersRepository.find({
      where: {
        store_id,
      },
      relations: ['user'],
    });

    return store;
  }
}
