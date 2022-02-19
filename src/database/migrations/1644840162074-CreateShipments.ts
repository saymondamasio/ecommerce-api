import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateShipments1644840162074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'shipments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'tracking_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            enumName: 'type_shipping',
            type: 'enum',
            enum: ['PAC', 'SEDEX', 'SEDEX_10', 'SEDEX_12', 'SEDEX_HOJE'],
          },
          {
            name: 'cost',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'deadline',
            type: 'timestamp',
          },
          {
            name: 'street',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'varchar',
          },
          {
            name: 'zip_code',
            type: 'varchar',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shipments');
  }
}
