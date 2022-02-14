import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { StoresController } from './controllers/stores.controller';
import { StoresRepository } from './repositories/stores.repository';
import { CreateStoreService } from './services/create-store.service';
import { ShowStoreService } from './services/show-store.service';
import { UpdateStoreService } from './services/update-store.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoresRepository]), SharedModule],
  controllers: [StoresController],
  providers: [CreateStoreService, ShowStoreService, UpdateStoreService],
})
export class StoreModule {}
