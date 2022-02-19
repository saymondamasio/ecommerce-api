import { EntityRepository, Repository } from 'typeorm';
import { Shipping } from '../entities/shipping.entity';

@EntityRepository(Shipping)
export class ShipmentsRepository extends Repository<Shipping> {}
