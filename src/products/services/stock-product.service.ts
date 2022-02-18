import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class StockProductService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute(product_id: string): Promise<{ stock: number }> {
    const product = await this.productsRepository.findOne(product_id, {
      select: ['stock'],
    });

    return { stock: product.stock };
  }
}
