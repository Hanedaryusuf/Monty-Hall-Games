export type GameState = 'selecting' | 'revealing' | 'finished';

export interface GameStats {
  wins: number;
  totalGames: number;
}