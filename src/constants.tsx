export const SEASON_READY = true;
export const CURRENT_WEEK = 3;
export const CURRENT_YEAR = '2023-2024';
export const CURRENT_WEEK_CUTOFF_TIME = new Date('March 26, 2023 13:00:00');
export const CURRENT_WEEK_FINAL_GAME = 'MIN @ PHI';
export const MONDAY_NIGHT_TOTAL = 0;
export const PRIOR_WEEK_COMPLETE = false;
export const TEAM_CODES = ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'];

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

type MarginPick = {
    team: string;
    margin: number;
};

type HighFivePick = {
    team: string;
    won: boolean;
};

type UserInfo = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    wins: number;
    losses: number;
    ties: number;
    percent: number;
    points: number;
    tbAvg: number;
    weeks: number;
    games: number;
    lastWeekRank: number;
    currentWeekRank: number;
    change: string;
    survivorPicks: string[];
    aliveInSurvivor: boolean;
    marginPicks: MarginPick[];
    marginTotal: number;
    highFiveThisWeek: HighFivePick[];
    highFiveValues: number[];
    highFiveTotal: number;
    currentWeekWins: number;
    currentWeekLosses: number;
    currentWeekTies: number;
    currentWeekPoints: number;
    currentWeekTiebreaker: number;
}

type SubmissionData = {
    id: string;
    lastName: string;
    firstName: string;
    username: string;
    'matchup-0': string;
    'matchup-1': string;
    'matchup-2': string;
    'matchup-3': string;
    'matchup-4': string;
    'matchup-5': string;
    'matchup-6': string;
    'matchup-7': string;
    'matchup-8': string;
    'matchup-9': string;
    'matchup-10': string;
    'matchup-11': string;
    'matchup-12'?: string;
    'matchup-13'?: string;
    'matchup-14'?: string;
    'matchup-15'?: string;
    tiebreaker: string;
    'margin-pick': string;
    highFivePicks: string[];
    'survivor-pick': string;
    'matchup-0-confidence': string;
    'matchup-1-confidence': string;
    'matchup-2-confidence': string;
    'matchup-3-confidence': string;
    'matchup-4-confidence': string;
    'matchup-5-confidence': string;
    'matchup-6-confidence': string;
    'matchup-7-confidence': string;
    'matchup-8-confidence': string;
    'matchup-9-confidence': string;
    'matchup-10-confidence': string;
    'matchup-11-confidence': string;
    'matchup-12-confidence'?: string;
    'matchup-13-confidence'?: string;
    'matchup-14-confidence'?: string;
    'matchup-15-confidence'?: string;
};

type SubmissionInfo = {
    submission_id: number;
    created_at: string;
    user_id: string;
    week: number;
    year: string;
    submission_data: SubmissionData;
};

export type { ValidPicks, ResultInfo, UserInfo, MarginPick, HighFivePick, SubmissionInfo, SubmissionData };
