import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { UpdatePhotosProductBO } from './bos/update-photos-product.bo';

@Injectable()
export class UpdatePhotosProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({ photos, product_id, store_id }: UpdatePhotosProductBO) {
    const product = await this.productsRepository.findOne({
      where: { id: product_id, store_id },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    product.photos = photos;

    await this.productsRepository.save(product);

    return product;
  }
}
