"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBattleResultTable1723759950364 = void 0;
const typeorm_1 = require("typeorm");
class CreateBattleResultTable1723759950364 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('battle_result');
    }
}
exports.CreateBattleResultTable1723759950364 = CreateBattleResultTable1723759950364;
//# sourceMappingURL=1723761035341-winnerTable.js.map