import { Exclude, Expose } from 'class-transformer';
import { storageConfig } from 'src/config/storage';
import {
  Column,
  CreateDateColumn,
  Entity,
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
        return `${process.env.APP_API_URL}/files/avatar/${this.avatar}`;
      case 's3':
        return `https://${storageConfig.config.aws.bucket}.s3.amazonaws.com/avatar/${this.avatar}`;
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
