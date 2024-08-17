import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class CreatePokemonTable1687349572381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear la tabla pokemon
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

    // Ruta al archivo JSON
    const filePath = path.join(process.cwd(), 'db', 'data', 'pokemon.json');
    const pokemonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Insertar los datos desde el JSON
    for (const pokemon of pokemonData.pokemon) {
      await queryRunner.query(
        `INSERT INTO "pokemon" ("name", "attack", "defense", "hp", "speed", "type", "imageUrl") VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          pokemon.name,
          pokemon.attack,
          pokemon.defense,
          pokemon.hp,
          pokemon.speed,
          pokemon.type,
          pokemon.imageUrl,
        ],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pokemon"`);
  }
}
