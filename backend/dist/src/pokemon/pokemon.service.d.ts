import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { BattleDto } from './dto/battle.dto';
import { BattleResult } from './entities/battle-result.entity';
export declare class PokemonService {
    private readonly pokemonRepository;
    private readonly battleResultRepository;
    constructor(pokemonRepository: Repository<Pokemon>, battleResultRepository: Repository<BattleResult>);
    findAll(): Promise<Pokemon[]>;
    battle(battleDto: BattleDto): Promise<BattleResult>;
    getRecentBattles(): Promise<BattleResult[]>;
}
