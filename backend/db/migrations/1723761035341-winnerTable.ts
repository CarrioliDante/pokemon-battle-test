import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBattleResultTable1723759950364
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'battle_result',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'pokemon1Id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'pokemon2Id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'winnerId',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'log',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'pokemon1Name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pokemon2Name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'winnerName',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('battle_result');
  }
}
