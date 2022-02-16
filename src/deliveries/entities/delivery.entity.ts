import Store from 'src/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column()
  store_id: string;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
