"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePokemonTable1687349572381 = void 0;
const fs = require("fs");
const path = require("path");
class CreatePokemonTable1687349572381 {
    async up(queryRunner) {
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
        const filePath = path.join(process.cwd(), 'db', 'data', 'pokemon.json');
        const pokemonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        for (const pokemon of pokemonData.pokemon) {
            await queryRunner.query(`INSERT INTO "pokemon" ("name", "attack", "defense", "hp", "speed", "type", "imageUrl") VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                pokemon.name,
                pokemon.attack,
                pokemon.defense,
                pokemon.hp,
                pokemon.speed,
                pokemon.type,
                pokemon.imageUrl,
            ]);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }
}
exports.CreatePokemonTable1687349572381 = CreatePokemonTable1687349572381;
//# sourceMappingURL=1723750589514-PokePopulate.js.map