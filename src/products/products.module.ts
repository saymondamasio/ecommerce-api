import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { CreateProductService } from './services/create-product.service';
import { ListProductsService } from './services/list-products.service';
import { UpdatePhotosProductService } from './services/update-photos-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsRepository])],
  controllers: [ProductsController],
  providers: [
    CreateProductService,
    ListProductsService,
    UpdatePhotosProductService,
  ],
})
export class ProductsModule {}
