import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1644838392824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
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
            name: 'availability',
            type: 'boolean',
          },
          {
            name: 'store_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'CategoriesStore',
            columnNames: ['store_id'],
            referencedTableName: 'stores',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('categories');
  }
}
