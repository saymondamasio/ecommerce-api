import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address';
import { TypeShipping } from './type-shipping.enum';

@Entity('shipments')
export class Shipping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tracking_code: string;

  @Column({ type: 'enum', enum: TypeShipping })
  type: TypeShipping;

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
