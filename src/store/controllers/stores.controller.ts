import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

@Controller('stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoresController {}
