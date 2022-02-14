import { Exclude, Expose } from 'class-transformer';
import { storageConfig } from 'src/config/storage';
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
import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url', toPlainOnly: true })
  getAvatarUrl(): string | undefined {
    if (!this.avatar) {
      return undefined;
    }

    switch (storageConfig.provider) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${storageConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return undefined;
    }
  }

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: [Permission.PRODUCTS_LIST],
  })
  permissions: Permission[];

  @Column({
    type: 'text',
    array: true,
    default: [Role.CUSTOMER],
  })
  roles: Role[];

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
