import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IStorageProvider } from 'src/shared/providers/StorageProvider/models/storage.provider';
import { Product } from '../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { UpdatePhotosProductBO } from './bos/update-photos-product.bo';

@Injectable()
export class UpdatePhotosProductService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @Inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,
  ) {}

  async execute({
    photos,
    product_id,
  }: UpdatePhotosProductBO): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id: product_id },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    if (product.photos?.length > 0) {
      for await (const photo of product.photos) {
        await this.storageProvider.deleteFile(photo, 'products');
      }
    }

    for await (const photo of photos) {
      await this.storageProvider.saveFile(photo, 'products');
    }
    product.photos = photos;

    await this.productsRepository.save(product);

    return product;
  }
}
