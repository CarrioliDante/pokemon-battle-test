import { Pokemon } from './pokemon.entity';
export declare class BattleResult {
    id: number;
    pokemon1: Pokemon;
    pokemon2: Pokemon;
    winner: Pokemon;
    pokemon1Name: string;
    pokemon2Name: string;
    winnerName: string;
    loserName: string;
    log: string;
}
