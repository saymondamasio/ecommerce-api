import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ValidateStoreGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { query, user } = request;

    if (!query.store_id) {
      throw new BadRequestException('store_id is required');
    }

    if (!query.store_id || !user?.store_id) {
      return false;
    }

    return query.store_id === user.store_id;
  }
}
