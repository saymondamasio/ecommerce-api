import { Injectable } from '@nestjs/common';
import { StoresRepository } from '../repositories/stores.repository';

@Injectable()
export class DeleteStoreService {
  constructor(private storesRepository: StoresRepository) {}

  async execute(id: string): Promise<void> {
    await this.storesRepository.delete(id);
  }
}
