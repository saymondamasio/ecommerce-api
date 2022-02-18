import {
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
    return this.updatePhotosProduct.execute({
      photos: photos.map((photo) => photo.filename),
      product_id,
    });
  }

  @Get()
  index() {
    return [
      {
        id: '83267366-a729-47b2-ad07-6abaf9c0329e',
        sku: 'AB1234',
        title: 'Produto 1',
        availability: true,
        description: 'Descrição do Produto 1',
        height: '25.00',
        width: '20.00',
        length: '50.00',
        weight: '250.00',
        stock: 10,
        photos: [
          '76e5ddbe9a259ff546bd-paul-gaudriault-a-QH9MAAVNI-unsplash.jpg',
          '744990746c93876787e6-revolt-164_6wVEHfI-unsplash.jpg',
        ],
        price: '25000.00',
        promotional_price: '20000.00',
        category_id: '4820d1d5-e38c-479d-81aa-d6298bfe324f',
        created_at: '2022-02-18T14:59:56.969Z',
        updated_at: '2022-02-18T15:53:00.546Z',
      },
    ];
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
