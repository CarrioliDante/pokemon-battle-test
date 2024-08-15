import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonModule } from './pokemon/pokemon.module'; // Importa el módulo Pokemon
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), // Configura la conexión de TypeORM
    PokemonModule, // Importa y registra el módulo Pokemon
  ],
  controllers: [AppController], // Controlador principal (si tienes alguno)
  providers: [AppService], // Servicio principal (si tienes alguno)
})
export class AppModule {}
