import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesRepository } from './repositories/categories.repository';
import { CreateCategoryService } from './services/create-category.service';
import { ListCategoriesService } from './services/list-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository])],
  controllers: [CategoriesController],
  providers: [CreateCategoryService, ListCategoriesService],
})
export class CategoriesModule {}
