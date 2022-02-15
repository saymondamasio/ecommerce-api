import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCategoryService } from '../services/create-category.service';
import { ListCategoriesService } from '../services/list-categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private createCategory: CreateCategoryService,
    private listCategories: ListCategoriesService,
  ) {}

  @Post()
  public create(
    @Query('store_id') store_id: string,
    @Body() createCategoryDto: CreateCategoryDTO,
  ) {
    return this.createCategory.execute({ store_id, ...createCategoryDto });
  }

  @Get()
  public index(@Query('store_id') store_id: string) {
    return this.listCategories.execute(store_id);
  }
}
