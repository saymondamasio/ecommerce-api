import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/categories/repositories/categories.repository';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductBO } from './bos/create-product.bo';

@Injectable()
export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

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
    const categoryExists = await this.categoriesRepository.findOne(category_id);

    if (!categoryExists) {
      throw new BadRequestException('Category does not exists');
    }

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
