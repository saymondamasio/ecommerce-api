import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address';
import { TypeDelivery } from './type-delivery.enum';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tracking_code: string;

  @Column({ type: 'enum', enum: TypeDelivery })
  type: TypeDelivery;

  @Column(() => Address, { prefix: false })
  address: Address;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column('timestamp')
  deadline: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
