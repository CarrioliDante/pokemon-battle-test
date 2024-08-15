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
exports.PokemonController = void 0;
const common_1 = require("@nestjs/common");
const pokemon_service_1 = require("./pokemon.service");
const battle_dto_1 = require("./dto/battle.dto");
let PokemonController = class PokemonController {
    constructor(pokemonService) {
        this.pokemonService = pokemonService;
    }
    async getAllPokemon() {
        return this.pokemonService.findAll();
    }
    async battle(battleDto) {
        let updatedBattleDto = { ...battleDto };
        if (battleDto.randomOpponent) {
            const allPokemon = await this.pokemonService.findAll();
            const possibleOpponents = allPokemon.filter((pokemon) => pokemon.id !== battleDto.pokemon1Id);
            if (possibleOpponents.length === 0) {
                throw new Error('No valid opponents available');
            }
            const randomIndex = Math.floor(Math.random() * possibleOpponents.length);
            updatedBattleDto = {
                ...battleDto,
                pokemon2Id: possibleOpponents[randomIndex].id,
            };
        }
        return await this.pokemonService.battle(updatedBattleDto);
    }
};
exports.PokemonController = PokemonController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "getAllPokemon", null);
__decorate([
    (0, common_1.Post)('battle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [battle_dto_1.BattleDto]),
    __metadata("design:returntype", Promise)
], PokemonController.prototype, "battle", null);
exports.PokemonController = PokemonController = __decorate([
    (0, common_1.Controller)('pokemon'),
    __metadata("design:paramtypes", [pokemon_service_1.PokemonService])
], PokemonController);
//# sourceMappingURL=pokemon.controller.js.map