import { Category } from '../entities/category.entity';
import { CategoriesRepository } from '../repositories/categories.repository';

export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(store_id: string): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }
}