import Customer from 'src/customers/entities/customer.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Shipping } from 'src/shipments/entities/shipping.entity';
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
import { CartItem } from './cart-item';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  cart: CartItem[];

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
  shipping_id: string;

  @OneToOne(() => Shipping)
  @JoinColumn({ name: 'shipping_id' })
  shipping: Shipping;

  @Column('varchar', { default: false })
  is_cancelled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
