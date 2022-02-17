import { Order } from 'src/orders/entities/order.entity';
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
import { StatusPayment } from './status-payment.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ enum: StatusPayment, default: StatusPayment.PENDING })
  status: StatusPayment;

  @Column()
  client_secret_stripe: string;

  @Column()
  store_id: string;

  @OneToOne(() => Order, (order) => order.payment)
  order: Order;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
