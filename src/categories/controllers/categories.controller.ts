import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidateStoreGuard } from 'src/auth/guards/validate-store.guard';
import { Role } from 'src/users/enums/role.enum';
import { CreateCategoryService } from '../services/create-category.service';
import { ListCategoriesService } from '../services/list-categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private createCategory: CreateCategoryService,
    private listCategories: ListCategoriesService,
  ) {}

  @UseGuards(JwtAuthGuard, ValidateStoreGuard)
  @Roles(Role.GUEST)
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
