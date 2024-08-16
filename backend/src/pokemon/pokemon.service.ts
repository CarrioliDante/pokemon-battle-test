import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { BattleDto } from './dto/battle.dto';
import { BattleResult } from './entities/battle-result.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(BattleResult)
    private readonly battleResultRepository: Repository<BattleResult>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    // console.log('Fetching all Pokémon from the database');
    const pokemons = await this.pokemonRepository.find();
    // console.log('Fetched Pokémon:', pokemons);
    return pokemons;
  }

  async battle(battleDto: BattleDto): Promise<BattleResult> {
    const { pokemon1Id, pokemon2Id } = battleDto;

    const pokemon1 = await this.pokemonRepository.findOneBy({ id: pokemon1Id });
    const pokemon2 = await this.pokemonRepository.findOneBy({ id: pokemon2Id });

    if (!pokemon1 || !pokemon2) {
      throw new NotFoundException('Pokémon not found');
    }

    let firstAttacker = pokemon1;
    let secondAttacker = pokemon2;

    // Determinar el primer atacante basado en velocidad y ataque
    if (
      pokemon2.speed > pokemon1.speed ||
      (pokemon2.speed === pokemon1.speed && pokemon2.attack > pokemon1.attack)
    ) {
      firstAttacker = pokemon2;
      secondAttacker = pokemon1;
    }

    let battleLog: string[] = [];
    let winner: Pokemon;
    let loser: Pokemon;

    // Inicializar HP originales para los Pokémon
    const originalHp1 = pokemon1.hp;
    const originalHp2 = pokemon2.hp;

    while (pokemon1.hp > 0 && pokemon2.hp > 0) {
      // Ataque del primer atacante
      const damage1 = Math.max(
        1,
        firstAttacker.attack - secondAttacker.defense,
      );
      secondAttacker.hp -= damage1;
      battleLog.push(
        `${firstAttacker.name} hits ${secondAttacker.name} for ${damage1} damage! HP left for ${secondAttacker.name}: ${secondAttacker.hp}`,
      );

      // Verificar si el segundo atacante ha sido derrotado
      if (secondAttacker.hp <= 0) {
        winner = firstAttacker;
        loser = secondAttacker;
        break;
      }

      // Ataque del segundo atacante
      const damage2 = Math.max(
        1,
        secondAttacker.attack - firstAttacker.defense,
      );
      firstAttacker.hp -= damage2;
      battleLog.push(
        `${secondAttacker.name} hits ${firstAttacker.name} for ${damage2} damage! HP left for ${firstAttacker.name}: ${firstAttacker.hp}`,
      );

      // Verificar si el primer atacante ha sido derrotado
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

  async getRecentBattles(): Promise<BattleResult[]> {
    const recentBattles = await this.battleResultRepository.find({
      order: { id: 'DESC' },
      take: 5,
    });
    console.log('Recent battles:', recentBattles);
    return recentBattles;
  }
}
