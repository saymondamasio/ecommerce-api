import { Injectable } from '@nestjs/common';
import Customer from '../entities/customer.entity';
import { CustomersRepository } from '../repositories/customers.repository';
import { ShowCustomerBO } from './bos/show-customer.bo';

@Injectable()
export class ShowCustomerService {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({ customer_id, user_id }: ShowCustomerBO): Promise<Customer> {
    if (user_id) {
      const customer = await this.customersRepository.findOne({
        where: {
          user_id,
        },
        relations: ['user'],
      });

      return customer;
    }

    const customer = await this.customersRepository.findOne({
      where: {
        id: customer_id,
      },
      relations: ['user'],
    });
    return customer;
  }
}
