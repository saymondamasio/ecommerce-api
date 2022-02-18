import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  public create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.createCategory.execute(createCategoryDto);
  }

  @Get()
  public index() {
    return this.listCategories.execute();
  }
}
