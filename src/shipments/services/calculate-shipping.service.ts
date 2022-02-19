import { BadRequestException, Injectable } from '@nestjs/common';
import { calcularPrecoPrazo, PrecoPrazoEvent } from 'correios-brasil/dist';
import { Product } from 'src/products/entities/product.entity';
import { ProductsRepository } from 'src/products/repositories/products.repository';
import { calculateBox } from 'src/utils/calculateBox';
import { addDays } from 'src/utils/date';
import { TypeShipping } from '../entities/type-shipping.enum';
import { CalculateShippingBO } from './bos/calculate-shipping.bo';

const correiosCode = {
  [TypeShipping.PAC]: '04510',
  [TypeShipping.SEDEX]: '04014',
  [TypeShipping.SEDEX_10]: '04804',
  [TypeShipping.SEDEX_12]: '04782',
  [TypeShipping.SEDEX_HOJE]: '04804',
};

@Injectable()
export class CalculateShippingService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ zip_code, cart }: CalculateShippingBO) {
    const errors: string[] = [];
    let weight = 0;
    const products: Product[] = [];
    let amount = 0;

    for await (const cart_item of cart) {
      const product = await this.productsRepository.findOne(
        cart_item.product_id,
      );

      products.push(product);

      weight += product.weight * cart_item.quantity;
      amount += product.price * cart_item.quantity;

      if (product.stock < cart_item.quantity) {
        errors.push(`${product.title} - Não há estoque suficiente`);
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const result = calculateBox(
      products.map((product) => ({
        height: product.height,
        length: product.length,
        width: product.width,
        weight: product.weight,
      })),
    );

    //verificar entrega
    const args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '68600000',
      sCepDestino: zip_code,
      nVlPeso: String(weight / 1000), //em gramas
      nCdFormato: '1',
      nVlComprimento: String(result.comprimento),
      nVlAltura: String(result.altura),
      nVlLargura: String(result.largura),
      nCdServico: Object.values(correiosCode), //Array com os códigos de serviço
      nVlDiametro: '0',
      nValorDeclarado: String(amount / 100), //em reais
    };
    try {
      const resultCorreios = (await calcularPrecoPrazo(
        args,
      )) as unknown as Array<PrecoPrazoEvent>;

      const shippingOptions = [];

      if (resultCorreios && resultCorreios.length > 0) {
        resultCorreios.forEach((shippingType) => {
          const cost = Number(shippingType.Valor.replace(',', '.')) * 100;

          const deadline = addDays(Number(shippingType.PrazoEntrega));

          const [type] = Object.entries(correiosCode).find(
            ([, value]) => value === shippingType.Codigo,
          );

          shippingOptions.push({
            type,
            cost,
            deadline,
            error: shippingType.Erro !== '0' ? shippingType.MsgErro : undefined,
          });
        });
      }

      return shippingOptions;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
