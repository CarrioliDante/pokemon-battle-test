"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pokemon_entity_1 = require("./entities/pokemon.entity");
const battle_result_entity_1 = require("./entities/battle-result.entity");
let PokemonService = class PokemonService {
    constructor(pokemonRepository, battleResultRepository) {
        this.pokemonRepository = pokemonRepository;
        this.battleResultRepository = battleResultRepository;
    }
    async findAll() {
        const pokemons = await this.pokemonRepository.find();
        return pokemons;
    }
    async battle(battleDto) {
        const { pokemon1Id, pokemon2Id } = battleDto;
        const pokemon1 = await this.pokemonRepository.findOneBy({ id: pokemon1Id });
        const pokemon2 = await this.pokemonRepository.findOneBy({ id: pokemon2Id });
        if (!pokemon1 || !pokemon2) {
            throw new common_1.NotFoundException('Pokémon not found');
        }
        let firstAttacker = pokemon1;
        let secondAttacker = pokemon2;
        if (pokemon2.speed > pokemon1.speed ||
            (pokemon2.speed === pokemon1.speed && pokemon2.attack > pokemon1.attack)) {
            firstAttacker = pokemon2;
            secondAttacker = pokemon1;
        }
        let battleLog = [];
        let winner;
        let loser;
        while (pokemon1.hp > 0 && pokemon2.hp > 0) {
            const damage1 = Math.max(1, firstAttacker.attack - secondAttacker.defense);
            secondAttacker.hp -= damage1;
            battleLog.push(`${firstAttacker.name} hits ${secondAttacker.name} for ${damage1} damage!`);
            if (secondAttacker.hp <= 0) {
                winner = firstAttacker;
                loser = secondAttacker;
                break;
            }
            const damage2 = Math.max(1, secondAttacker.attack - firstAttacker.defense);
            firstAttacker.hp -= damage2;
            battleLog.push(`${secondAttacker.name} hits ${firstAttacker.name} for ${damage2} damage!`);
            if (firstAttacker.hp <= 0) {
                winner = secondAttacker;
                loser = firstAttacker;
                break;
            }
        }
        const battleResult = this.battleResultRepository.create({
            pokemon1,
            pokemon2,
            winner,
            loserName: loser.name,
            pokemon1Name: pokemon1.name,
            pokemon2Name: pokemon2.name,
            winnerName: winner.name,
            log: JSON.stringify(battleLog),
        });
        const savedResult = await this.battleResultRepository.save(battleResult);
        return savedResult;
    }
};
exports.PokemonService = PokemonService;
exports.PokemonService = PokemonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pokemon_entity_1.Pokemon)),
    __param(1, (0, typeorm_1.InjectRepository)(battle_result_entity_1.BattleResult)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PokemonService);
//# sourceMappingURL=pokemon.service.js.map