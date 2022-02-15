import {
  registerDecorator,
  ValidationArguments,
  ValidatorOptions,
} from 'class-validator';

export function IsSKU(validationOptions?: ValidatorOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isSKU',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions || {
        message: '$property is not a valid SKU',
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          return /([a-zA-Z]{2}\\d{4,18})?/.test(value);
        },
      },
    });
  };
}
