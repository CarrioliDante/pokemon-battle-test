import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { BattleDto } from './dto/battle.dto';
import { BattleResult } from './entities/battle-result.entity';
export declare class PokemonController {
    private readonly pokemonService;
    constructor(pokemonService: PokemonService);
    getAllPokemon(): Promise<Pokemon[]>;
    battle(battleDto: BattleDto): Promise<BattleResult>;
    getBattleHistory(): Promise<BattleResult[]>;
}
