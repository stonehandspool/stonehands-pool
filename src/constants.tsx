export const CURRENT_WEEK = 1;
export const CURRENT_YEAR = '2023-2024';
export const MONDAY_NIGHT_TOTAL = 0;
export const CURRENT_WEEK_COMPLETE = false;

// Global types
type ValidPicks = 
    'BUF' | 'MIA' | 'NE' | 'NYJ' |
    'BAL' | 'CIN' | 'CLE' | 'PIT' |
    'HOU' | 'IND' | 'JAX' | 'TEN' |
    'DEN' | 'KC' | 'LV' | 'LAC' |
    'DAL' | 'NYG' | 'PHI' | 'WAS' |
    'CHI' | 'DET' | 'GB' | 'MIN' |
    'ATL' | 'CAR' | 'NO' | 'TB' |
    'ARI' | 'LAR' | 'SF' | 'SEA';

type ResultInfo = {
    homeTeam: ValidPicks;
    awayTeam: ValidPicks;
    homeScore: number;
    awayScore: number;
    winner: ValidPicks | 'Tie'; // Probably not needed, but just to make my life easier
}

export type { ValidPicks, ResultInfo };
