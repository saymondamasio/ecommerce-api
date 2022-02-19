import { Expose } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { storageConfig } from 'src/config/storage';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  title: string;

  @Column('boolean', { default: true })
  availability: boolean;

  @Column()
  description: string;

  @Column('decimal')
  height: number;

  @Column('decimal')
  width: number;

  @Column('decimal')
  length: number;

  @Column('decimal')
  weight: number;

  @Column('decimal', { default: 0 })
  stock: number;

  @Column({ type: 'simple-array' })
  photos: string[];

  @Expose({ name: 'photos_url', toPlainOnly: true })
  getPhotosUrl(): string[] | undefined {
    if (!this.photos || this.photos.length === 0) {
      return undefined;
    }

    switch (storageConfig.provider) {
      case 'disk':
        return this.photos.map(
          (photo) => `${process.env.APP_API_URL}/files/products/${photo}`,
        );
      default:
        return undefined;
    }
  }

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  promotional_price: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
