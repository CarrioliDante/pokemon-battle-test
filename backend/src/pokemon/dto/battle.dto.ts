export class BattleDto {
  readonly pokemon1Id: number;
  readonly pokemon2Id?: number; // Opcional si se elige un oponente aleatorio
  readonly randomOpponent?: boolean; // Indica si el oponente es aleatorio
}
