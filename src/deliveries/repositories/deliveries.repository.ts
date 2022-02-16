import { EntityRepository, Repository } from 'typeorm';
import { Delivery } from '../entities/delivery.entity';

@EntityRepository(Delivery)
export class DeliveriesRepository extends Repository<Delivery> {}
