import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './controllers/dto/create-store.dto';
import { UpdateStoreDto } from './controllers/dto/update-store.dto';

@Injectable()
export class StoreService {
  create(createStoreDto: CreateStoreDto) {
    return 'This action adds a new store';
  }

  findAll() {
    return `This action returns all store`;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
