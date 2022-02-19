import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrders1644840422176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'cart',
            type: 'text',
          },
          {
            name: 'customer_id',
            type: 'uuid',
          },
          {
            name: 'payment_id',
            type: 'uuid',
          },
          {
            name: 'shipping_id',
            type: 'uuid',
          },
          {
            name: 'is_cancelled',
            type: 'varchar',
            default: false,
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
            name: 'CustomerOrder',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'PaymentOrder',
            referencedTableName: 'payments',
            referencedColumnNames: ['id'],
            columnNames: ['payment_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ShippingOrder',
            referencedTableName: 'shipments',
            referencedColumnNames: ['id'],
            columnNames: ['shipping_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
