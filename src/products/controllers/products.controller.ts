import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { CreateProductService } from '../services/create-product.service';
import { FindProductService } from '../services/find-product.service';
import { ListProductsService } from '../services/list-products.service';
import { StockProductService } from '../services/stock-product.service';
import { UpdatePhotosProductService } from '../services/update-photos-product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductsController {
  constructor(
    private readonly createProduct: CreateProductService,
    private readonly findProduct: FindProductService,
    private readonly stockProduct: StockProductService,
    private readonly listProducts: ListProductsService,
    private readonly updatePhotosProduct: UpdatePhotosProductService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createProductDTO: CreateProductDTO) {
    return this.createProduct.execute(createProductDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FilesInterceptor('photos'))
  @Patch('photos/:product_id')
  updatePhotos(
    @UploadedFiles() photos: Express.Multer.File[],
    @Param('product_id') product_id: string,
  ) {
    if (photos.length === 0) {
      throw new BadRequestException('No photos were uploaded.');
    }

    return this.updatePhotosProduct.execute({
      photos: photos.map((photo) => photo.filename),
      product_id,
    });
  }

  @Get()
  index() {
    return this.listProducts.execute();
  }

  @Get(':id/stock')
  stock(@Param('id') id: string) {
    return this.stockProduct.execute(id);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.findProduct.execute(id);
  }
}
