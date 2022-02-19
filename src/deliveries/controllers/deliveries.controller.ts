import { Body, Controller, Post } from '@nestjs/common';
import { CalculateDeliveryService } from '../services/calculate-delivery.service';
import { CalculateDeliveryDTO } from './dtos/calculateDelivery.dto';

@Controller('deliveries')
export class DeliveriesController {
  constructor(private calculateDeliveryService: CalculateDeliveryService) {}

  @Post('calculate')
  calculateDelivery(@Body() calculateDeliveryDTO: CalculateDeliveryDTO) {
    return this.calculateDeliveryService.execute(calculateDeliveryDTO);
  }
}
