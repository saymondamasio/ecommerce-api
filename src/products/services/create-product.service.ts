import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductBO } from './bo/create-product.bo';

export class CreateProductService {
  constructor(private productsRepository: ProductsRepository) {}

  public async execute({
    category_id,
    description,
    price,
    promotional_price,
    sku,
    store_id,
    title,
  }: CreateProductBO): Promise<Product> {
    const product = this.productsRepository.create({
      category_id,
      description,
      price,
      promotional_price,
      sku,
      store_id,
      title,
    });

    await this.productsRepository.save(product);

    return product;
  }
}
