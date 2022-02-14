import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateStoreService } from '../services/create-store.service';
import { DeleteStoreService } from '../services/delete-store.service';
import { ShowStoreService } from '../services/show-store.service';
import { UpdateStoreService } from '../services/update-store.service';
import { UpdateStoreDTO } from './dto/create-store.dto';
import { CreateStoreDTO } from './dto/update-store.dto';

@Controller('stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoresController {
  constructor(
    private createStore: CreateStoreService,
    private showStore: ShowStoreService,
    private deleteStore: DeleteStoreService,
    private updateStore: UpdateStoreService,
  ) {}

  @Post()
  async create(@Body() createStoreDTO: CreateStoreDTO) {
    return this.createStore.execute(createStoreDTO);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDTO: UpdateStoreDTO,
  ) {
    return this.updateStore.execute({ id, ...updateStoreDTO });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    return this.deleteStore.execute(id);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.showStore.execute(id);
  }
}
