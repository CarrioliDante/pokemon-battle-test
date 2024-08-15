import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity()
export class BattleResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pokemon)
  pokemon1: Pokemon;

  @ManyToOne(() => Pokemon)
  pokemon2: Pokemon;

  @ManyToOne(() => Pokemon)
  winner: Pokemon;

  @Column()
  pokemon1Name: string;

  @Column()
  pokemon2Name: string;

  @Column()
  winnerName: string;

  @Column()
  loserName: string;

  @Column('text')
  log: string;
}
