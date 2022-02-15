import { isCPF } from 'brazilian-values';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';

export function IsCPF(validationOptions?: ValidatorOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions || {
        message: '$property is not a valid CPF',
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isCPF(value);
        },
      },
    });
  };
}
