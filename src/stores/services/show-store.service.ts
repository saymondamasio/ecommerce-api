import { Injectable } from '@nestjs/common';
import Store from '../entities/store.entity';
import { StoresRepository } from '../repositories/stores.repository';

@Injectable()
export class ShowStoreService {
  constructor(private storesRepository: StoresRepository) {}

  async execute(id: string): Promise<Store> {
    const store = await this.storesRepository.findOne(id);

    return store;
  }
}
