import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryBO } from './bo/create-category.bo';

@Injectable()
export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({ name }: CreateCategoryBO): Promise<Category> {
    const category = this.categoriesRepository.create({
      name,
    });

    await this.categoriesRepository.save(category);

    return category;
  }
}
