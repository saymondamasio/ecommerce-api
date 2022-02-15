import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { CreateCategoryService } from './services/create-category.service';
import { ListCategoriesService } from './services/list-categories.service';

@Module({
  controllers: [CategoriesController],
  providers: [CreateCategoryService, ListCategoriesService],
})
export class CategoriesModule {}
