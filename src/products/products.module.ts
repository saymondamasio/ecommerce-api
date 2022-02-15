import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CreateProductService } from './services/create-product.service';
import { ListProductsService } from './services/list-products.service';

@Module({
  controllers: [ProductsController],
  providers: [CreateProductService, ListProductsService],
})
export class ProductsModule {}
