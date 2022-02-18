import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1644838628973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'sku',
            type: 'varchar',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'availability',
            type: 'boolean',
            default: true,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'photos',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'promotional_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'height',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'width',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'length',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'weight',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'stock',
            type: 'int',
            default: 0,
          },
          {
            name: 'category_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'CategoryProduct',
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
