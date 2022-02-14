import { Module } from '@nestjs/common';
import { StoresController } from './controllers/stores.controller';

@Module({
  controllers: [StoresController],
  providers: [],
})
export class StoreModule {}
