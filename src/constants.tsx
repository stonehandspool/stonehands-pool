// This should be set to false prior to the release of the first weeks picksheet, and then true until the end of the regular season
// This is used to check for each of the standings and stats pages to see if it should check for data, if false it will not display anything
export const SEASON_READY: boolean = true;
// This should be toggled once sign ups are disabled
export const SIGN_UPS_DISABLED: boolean = true;
// This should be updated on Wednesday of every week when the next weeks picksheet becomes available
// This is used to keep track of the current NFL regular season week and is used to get data from the json files
export const CURRENT_WEEK: number = 8;
// This should match whatever the current NFL season that is active and should only update once a year
// This is used for any of the stats/standings pages for the text up top
export const CURRENT_YEAR: string = '2024';
// This is a date in a valid `Date` format which should be taken from the season schedule each week
// This is used to check if a user can still submit their picksheet, it should generally be the first Sunday game each week
// Unless there is a few Saturday games later in the season
export const CURRENT_WEEK_CUTOFF_TIME = new Date('2024-10-27T17:00:00.000Z');
// This is whatever the last scheduled game is in a given week
// This is used to tell the users what game they should be predicting the total final score of for a week
export const CURRENT_WEEK_FINAL_GAME: string = 'NYG @ PIT';
export const PREV_WEEK_FINAL_GAME: string = 'LAC @ ARI';
// This should be updated every Tuesday morning with the total score of the game above
// This is used to determine the tiebreaker for the weekly standings
export const MONDAY_NIGHT_TOTAL: number = 0;
export const PREV_MONDAY_NIGHT_TOTAL: number = 32;
// This is to mark the different states that a week can be in
// START: This means that this is a new week and no games have been played yet
//          - Wednesday & Thursday
//          - The weekly standings pages should still show the prior weeks standings
//          - The weekly picks should also show the prior weeks picks
//          - The picksheet should be updated with the new weeks matchups
// IN_PROGRESS: This means that at least one game has been played in a given week
//          - Friday through Monday
//          - The weekly standings and picks should show one of the following:
//              - Just the Thursday night standings and picks if the current time is BEFORE the cutoff
//              - All of the up to date standings and picks if the current time is AFTER the cutoff
//          - The picksheet should be in one of the following states:
//              - Available for changes with any completed games locked BEFORE the cutoff
//              - Locked and unavailable AFTER the cutoff
// COMPLETE: This means that ALL of the games in a given week have been completed and the scores have all been entered into the site
//          - Tuesday & Wednesday (until switch to new week and switch to START)
//          - The weekly standings and picks should show all available up to date data with no restrictions
//              - The weekly standings should signify the current weeks winner
//          - The picksheet should still be unavailable
type WeekStatus = 'START' | 'IN_PROGRESS' | 'COMPLETE';
export const CURRENT_WEEK_STATUS: WeekStatus = 'IN_PROGRESS';
// These are the team codes used throughout the codebase and should only be changed if a new team joins the league or a team relocates
export const TEAM_CODES = [
  'ARI',
  'ATL',
  'BAL',
  'BUF',
  'CAR',
  'CHI',
  'CIN',
  'CLE',
  'DAL',
  'DEN',
  'DET',
  'GB',
  'HOU',
  'IND',
  'JAC',
  'KC',
  'LAC',
  'LA',
  'LV',
  'MIA',
  'MIN',
  'NE',
  'NO',
  'NYG',
  'NYJ',
  'PHI',
  'PIT',
  'SEA',
  'SF',
  'TB',
  'TEN',
  'WAS',
];

type ResultInfo = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: string;
};

type MarginPick = {
  team: string | null;
  margin: number | null;
};

type HighFivePick = {
  team: string;
  won: boolean | null;
};

type UserInfo = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  wins: number;
  winsByWeek: number[];
  losses: number;
  lossesByWeek: number[];
  ties: number;
  tiesByWeek: number[];
  percent: number;
  points: number;
  pointsByWeek: number[];
  tbAvg: number;
  tiebreakerByWeek: number[];
  lastWeekRank: number;
  currentWeekRank: number;
  rankByWeek: number[];
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
};

type ConfidenceMatchupInfo = {
  matchupId: string;
  team: string | null;
  confidence: number | null;
};

type PicksheetData = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  confidencePicks: ConfidenceMatchupInfo[];
  tiebreaker: number;
  marginPick: string;
  survivorPick: string | null;
  highFivePicks: string[];
};

type DatabaseData = {
  id: number;
  created_at: string;
  user_id: string;
  username: string;
  week: number;
  times_updated: number;
  submission_data: PicksheetData;
};

type MatchupInfo = {
  matchupId: string;
  homeTeam: string;
  awayTeam: string;
  time: string;
  gameInfo: string;
  homeScore: number;
  awayScore: number;
  winner: string;
  evaluated: boolean;
};

// March Madness specific types

type MarchMadnessTeamInfo = {
  seed: number | null;
  name: string | null;
  record: string | null;
};

type MarchMadnessMatchupInfo = {
  id: string;
  topTeam: MarchMadnessTeamInfo;
  bottomTeam: MarchMadnessTeamInfo;
  topScore: number | null;
  bottomScore: number | null;
  winner: 'top' | 'bottom' | null;
  round: number;
  evaluated: boolean;
  nextMatchup: string | null;
};

type MarchMadnessPlayerInfo = {
  firstName: string;
  lastName: string;
  userId: string;
  username: string;
  bracketTitle: string;
  timesUpdated: number;
  tiebreaker: number;
  points: number;
  numCorrect: number;
  numIncorrect: number;
  pointsByRound: number[];
  currentMaxPoints: number;
  startingMaxPoints: number;
  userPicks: MarchMadnessMatchupInfo[];
};

export type {
  ConfidenceMatchupInfo,
  MatchupInfo,
  ResultInfo,
  UserInfo,
  MarginPick,
  HighFivePick,
  DatabaseData,
  PicksheetData,
  MarchMadnessTeamInfo,
  MarchMadnessMatchupInfo,
  MarchMadnessPlayerInfo,
};

// March Madness specific constants
type MarchMadnessStates = 'INACTIVE' | 'READY_FOR_PICKS' | 'ACTIVE';
export const MARCH_MADNESS_STATE: MarchMadnessStates = 'INACTIVE';
export const MARCH_MADNESS_CUTOFF = new Date('2024-03-21T16:15:00.000Z');
export const ROUND_VALUES = [1, 2, 4, 8, 16, 32];
export const MARCH_MADNESS_CURRENT_ROUND = 6;
export const MARCH_MADNESS_FINAL_TOTAL = 135;
