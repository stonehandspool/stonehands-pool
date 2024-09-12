import * as path from 'path';
import minimist from 'minimist';
import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'fs/promises';

const args = minimist(process.argv.slice(2));
const { year } = args;

// First, validate that we received a valid year
if (isNaN(year)) {
  console.log('Please make sure that the first param is a valid year');
  console.log(`Expected a year but got: ${year}`);
  process.exit();
}

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyMjcyNzAsImV4cCI6MTk4ODgwMzI3MH0.2VfUzB0S6IK-5jIgbqClhgrVBVcCY84q8Cd39FcbYZA';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabaseClient.from('user_info').select();

if (error) {
  console.log('An error occurred when trying to connect to supabase');
  console.log(error);
  process.exit();
}

if (data) {
  const playersArr = [];
  data.forEach(dataRow => {
    const { id, username, first_name: firstName, last_name: lastName } = dataRow;
    playersArr.push({
      id,
      username,
      firstName,
      lastName,
      wins: 0,
      winsByWeek: [],
      losses: 0,
      lossesByWeek: [],
      ties: 0,
      tiesByWeek: [],
      percent: 0,
      points: 0,
      pointsByWeek: [],
      tbAvg: 0,
      tiebreakerByWeek: [],
      lastWeekRank: 0,
      currentWeekRank: 0,
      rankByWeek: [],
      change: '--',
      currentWeekWins: 0,
      currentWeekLosses: 0,
      currentWeekTies: 0,
      currentWeekPoints: 0,
      currentWeekTiebreaker: 0,
      survivorPicks: [],
      aliveInSurvivor: true,
      marginPicks: [],
      marginTotal: 0,
      highFiveValues: [],
      highFiveTotal: 0,
      highFiveThisWeek: [],
    });
  });
  const playersAsJson = JSON.stringify(playersArr, null, 2);
  await writeFile(path.resolve(`data/${year}/football/players.json`), playersAsJson);
  console.log(`Created a new file at data/${year}/football/players.json in order to keep track of the players results`);
}

process.exit();
