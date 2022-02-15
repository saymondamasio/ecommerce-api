import { isCNPJ } from 'brazilian-values';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';

export function IsCNPJ(validationOptions?: ValidatorOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions || {
        message: '$property is not a valid CNPJ',
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isCNPJ(value);
        },
      },
    });
  };
}
