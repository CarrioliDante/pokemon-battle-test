"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddLoserToBattleResult1723761232367 = void 0;
const typeorm_1 = require("typeorm");
class AddLoserToBattleResult1723761232367 {
    constructor() {
        this.name = 'AddLoserToBattleResult1723761232367';
    }
    async up(queryRunner) {
        await queryRunner.addColumn('battle_result', new typeorm_1.TableColumn({
            name: 'loserName',
            type: 'varchar',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('battle_result', 'loserName');
    }
}
exports.AddLoserToBattleResult1723761232367 = AddLoserToBattleResult1723761232367;
//# sourceMappingURL=1723761232367-addLoosertoTable.js.map