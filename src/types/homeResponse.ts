export interface HomeResponse {
  id: string;
  homeTeam: number;
  homeScore: string;
  awayTeam: string;
  awayScore: number;
  minute: number;
  isHomeGoal: boolean;
  isAwayGoal: boolean;
  isHomeBigChange: boolean;
  isAwayBigChange: boolean;
}
