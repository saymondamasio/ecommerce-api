import { Body, Controller, Post } from '@nestjs/common';
import { CalculateShippingService } from '../services/calculate-shipping.service';
import { CalculateShippingDTO } from './dtos/calculate-shipping.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private calculateShippingService: CalculateShippingService) {}

  @Post('calculate')
  calculateShipping(@Body() calculateShippingDTO: CalculateShippingDTO) {
    return this.calculateShippingService.execute(calculateShippingDTO);
  }
}
