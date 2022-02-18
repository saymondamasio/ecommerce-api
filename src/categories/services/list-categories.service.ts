import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}
