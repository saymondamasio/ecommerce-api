import { Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductBO } from './bos/create-product.bo';

@Injectable()
export class CreateProductService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute({
    category_id,
    description,
    price,
    promotional_price,
    sku,
    stock,
    title,
    height,
    length,
    weight,
    width,
  }: CreateProductBO): Promise<Product> {
    const product = this.productsRepository.create({
      category_id,
      description,
      price,
      promotional_price,
      sku,
      title,
      height,
      length,
      weight,
      width,
      stock,
    });

    await this.productsRepository.save(product);

    return product;
  }
}
