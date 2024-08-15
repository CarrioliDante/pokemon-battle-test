import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLoserToBattleResult1723761232367 implements MigrationInterface {
  name = 'AddLoserToBattleResult1723761232367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Agregar la columna loserName, permitiendo valores NULL inicialmente
    await queryRunner.addColumn(
      'battle_result',
      new TableColumn({
        name: 'loserName',
        type: 'varchar',
        isNullable: true, // Permitir valores NULL durante la migración
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar la columna loserName en caso de revertir la migración
    await queryRunner.dropColumn('battle_result', 'loserName');
  }
}
