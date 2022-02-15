import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ValidateStoreGuard } from 'src/auth/guards/validate-store.guard';
import { Role } from 'src/users/enums/role.enum';
import { CreateProductService } from '../services/create-product.service';
import { ListProductsService } from '../services/list-products.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProductService,
    private readonly listProducts: ListProductsService,
  ) {}

  @UseGuards(JwtAuthGuard, ValidateStoreGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('photos'))
  @Post()
  create(
    @UploadedFiles() photos: Express.Multer.File[],
    @Query('store_id') store_id: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    return this.createProduct.execute({
      store_id,
      photos: photos.map((photo) => photo.filename),
      ...createProductDTO,
    });
  }

  @Get()
  index(@Query('store_id') store_id: string) {
    return this.listProducts.execute(store_id);
  }
}
