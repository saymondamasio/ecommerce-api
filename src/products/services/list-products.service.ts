import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ListProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute(store_id: string): Promise<Product[]> {
    const products = await this.productsRepository.find({
      store_id,
    });

    return products;
  }
}
