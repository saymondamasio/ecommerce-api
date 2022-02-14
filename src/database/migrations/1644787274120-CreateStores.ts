import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStores1644787274120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stores',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phones',
            type: 'varchar',
          },
          {
            name: 'address_street',
            type: 'varchar',
          },
          {
            name: 'address_number',
            type: 'varchar',
          },
          {
            name: 'address_neighborhood',
            type: 'varchar',
          },
          {
            name: 'address_complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address_city',
            type: 'varchar',
          },
          {
            name: 'address_state',
            type: 'varchar',
          },
          {
            name: 'address_zip_code',
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
    await queryRunner.dropTable('stores');
  }
}
