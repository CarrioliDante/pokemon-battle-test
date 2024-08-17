import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLoserToBattleResult1723761232367 implements MigrationInterface {
  name = 'AddLoserToBattleResult1723761232367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Agrega la columna loserName
    await queryRunner.addColumn(
      'battle_result',
      new TableColumn({
        name: 'loserName',
        type: 'varchar',
        isNullable: true, //NULL durante la migración
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('battle_result', 'loserName');
  }
}
