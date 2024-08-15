import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { BattleResult } from './entities/battle-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])], // Registrar la entidad Pokemon
  providers: [PokemonService], // Registrar el servicio Pokemon
  controllers: [PokemonController], // Registrar el controlador Pokemon
})
export class PokemonModule {}
