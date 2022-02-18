import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class FindProductService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute(product_id: string): Promise<Product> {
    const product = await this.productsRepository.findOne(product_id);

    return product;
  }
}
