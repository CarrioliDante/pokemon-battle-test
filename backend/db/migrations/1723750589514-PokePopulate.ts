import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePokemonTable1687349572381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "pokemon" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "name" varchar NOT NULL,
        "attack" integer NOT NULL,
        "defense" integer NOT NULL,
        "hp" integer NOT NULL,
        "speed" integer NOT NULL,
        "type" varchar NOT NULL,
        "imageUrl" varchar NOT NULL
      );
    `);

    await queryRunner.query(`
      INSERT INTO "pokemon" ("name", "attack", "defense", "hp", "speed", "type", "imageUrl") VALUES
      ('Pikachu', 4, 3, 3, 6, 'Electric', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'),
      ('Charmander', 4, 3, 3, 4, 'Fire', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'),
      ('Squirtle', 3, 4, 3, 3, 'Water', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'),
      ('Bulbasaur', 4, 3, 3, 3, 'Grass', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'),
      ('Eevee', 4, 3, 4, 5, 'Normal', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pokemon"`);
  }
}
