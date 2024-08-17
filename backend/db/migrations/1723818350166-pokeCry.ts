import { MigrationInterface, QueryRunner } from 'typeorm';

export class PokeCry1723818350166 implements MigrationInterface {
  name = 'PokeCry1723818350166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_pokemon" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL, "cryUrl" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "pokemon"`,
    );
    await queryRunner.query(`DROP TABLE "pokemon"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_pokemon" RENAME TO "pokemon"`,
    );

    await queryRunner.query(
      `UPDATE "pokemon" SET "cryUrl" = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg' WHERE "name" = 'Pikachu'`,
    );
    await queryRunner.query(
      `UPDATE "pokemon" SET "cryUrl" = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/4.ogg' WHERE "name" = 'Charmander'`,
    );
    await queryRunner.query(
      `UPDATE "pokemon" SET "cryUrl" = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/7.ogg' WHERE "name" = 'Squirtle'`,
    );
    await queryRunner.query(
      `UPDATE "pokemon" SET "cryUrl" = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg' WHERE "name" = 'Bulbasur'`,
    );
    await queryRunner.query(
      `UPDATE "pokemon" SET "cryUrl" = 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/133.ogg' WHERE "name" = 'Eevee'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pokemon" RENAME TO "temporary_pokemon"`,
    );
    await queryRunner.query(
      `CREATE TABLE "pokemon" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "pokemon"("id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl") SELECT "id", "name", "attack", "defense", "hp", "speed", "type", "imageUrl" FROM "temporary_pokemon"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_pokemon"`);
  }
}
