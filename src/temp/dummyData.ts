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

const dummyData: { homeTeam: ValidPicks, awayTeam: ValidPicks }[] = [
    { homeTeam: 'LV', awayTeam: 'KC' },
    { homeTeam: 'JAX', awayTeam: 'TEN' },
    { homeTeam: 'PIT', awayTeam: 'CLE' },
    { homeTeam: 'CIN', awayTeam: 'BAL' },
    { homeTeam: 'CHI', awayTeam: 'MIN' },
    { homeTeam: 'BUF', awayTeam: 'NE' },
    { homeTeam: 'MIA', awayTeam: 'NYJ' },
    { homeTeam: 'ATL', awayTeam: 'TB' },
    { homeTeam: 'NO', awayTeam: 'CAR' },
    { homeTeam: 'HOU', awayTeam: 'IND' },
    { homeTeam: 'SF', awayTeam: 'ARI' },
    { homeTeam: 'DAL', awayTeam: 'WAS' },
    { homeTeam: 'SEA', awayTeam: 'LAR' },
    { homeTeam: 'PHI', awayTeam: 'NYG' },
    { homeTeam: 'DEN', awayTeam: 'LAC' },
    { homeTeam: 'GB', awayTeam: 'DET' },
];

const week18Results: ResultInfo[] = [
    { homeTeam: 'LV', awayTeam: 'KC', homeScore: 13, awayScore: 31, winner: 'KC' },
    { homeTeam: 'JAX', awayTeam: 'TEN', homeScore: 20, awayScore: 16, winner: 'JAX' },
    { homeTeam: 'PIT', awayTeam: 'CLE', homeScore: 28, awayScore: 14, winner: 'PIT' },
    { homeTeam: 'CIN', awayTeam: 'BAL', homeScore: 27, awayScore: 16, winner: 'CIN' },
    { homeTeam: 'CHI', awayTeam: 'MIN', homeScore: 13, awayScore: 29, winner: 'MIN' },
    { homeTeam: 'BUF', awayTeam: 'NE', homeScore: 23, awayScore: 35, winner: 'BUF' },
    { homeTeam: 'MIA', awayTeam: 'NYJ', homeScore: 11, awayScore: 6, winner: 'MIA' },
    { homeTeam: 'ATL', awayTeam: 'TB', homeScore: 30, awayScore: 17, winner: 'ATL' },
    { homeTeam: 'NO', awayTeam: 'CAR', homeScore: 7, awayScore: 10, winner: 'CAR' },
    { homeTeam: 'HOU', awayTeam: 'IND', homeScore: 31, awayScore: 32, winner: 'HOU' },
    { homeTeam: 'SF', awayTeam: 'ARI', homeScore: 38, awayScore: 13, winner: 'SF' },
    { homeTeam: 'DAL', awayTeam: 'WAS', homeScore: 26, awayScore: 6, winner: 'WAS' },
    { homeTeam: 'SEA', awayTeam: 'LAR', homeScore: 19, awayScore: 16, winner: 'SEA' },
    { homeTeam: 'PHI', awayTeam: 'NYG', homeScore: 22, awayScore: 16, winner: 'PHI' },
    { homeTeam: 'DEN', awayTeam: 'LAC', homeScore: 31, awayScore: 28, winner: 'DEN' },
    { homeTeam: 'GB', awayTeam: 'DET', homeScore: 16, awayScore: 20, winner: 'DET' },
];

export { dummyData, week18Results };
export type { ValidPicks, ResultInfo };
