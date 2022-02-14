import { Injectable } from '@nestjs/common';
import { AppError } from 'src/shared/errors/AppError';
import Store from '../entities/store.entity';
import { StoresRepository } from '../repositories/stores.repository';
import { UpdateStoreBO } from './bos/update-store.bo';

@Injectable()
export class UpdateStoreService {
  constructor(private storesRepository: StoresRepository) {}

  async execute({
    id,
    name,
    address,
    cnpj,
    email,
    phones,
  }: UpdateStoreBO): Promise<Store> {
    const checkStoreExists = await this.storesRepository.findOne({ cnpj });

    if (checkStoreExists) {
      throw new AppError('CNPJ is already used.');
    }

    const store = this.storesRepository.create({
      address,
      cnpj,
      email,
      name,
      phones,
    });

    await this.storesRepository.save(store);

    return store;
  }
}
