import Customer from 'src/customers/entities/customer.entity';
import { Delivery } from 'src/deliveries/entities/delivery.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import Store from 'src/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  cart: Cart[];

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  payment_id: string;

  @OneToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @Column()
  delivery_id: string;

  @OneToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @Column()
  store_id: string;

  @OneToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column('varchar', { default: false })
  is_cancelled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
