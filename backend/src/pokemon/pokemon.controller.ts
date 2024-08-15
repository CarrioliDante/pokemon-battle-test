import { Controller, Get, Post, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { BattleDto } from './dto/battle.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemon(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Post('battle')
  async battle(@Body() battleDto: BattleDto) {
    let updatedBattleDto = { ...battleDto };

    if (battleDto.randomOpponent) {
      const allPokemon = await this.pokemonService.findAll();
      const possibleOpponents = allPokemon.filter(
        (pokemon) => pokemon.id !== battleDto.pokemon1Id,
      );

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
}
