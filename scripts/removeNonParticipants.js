import * as path from 'path';
import minimist from 'minimist';
import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile } from 'fs/promises';

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

// First, get the current list of all members that we need to cut down
const allPlayers = await JSON.parse(await readFile(path.resolve(`data/${year}/football/players.json`)));

const { data, error } = await supabaseClient.from(`football_picks_${year}`).select('user_id');

if (error) {
  console.log('An error occurred when trying to connect to supabase');
  console.log(error);
  process.exit();
}

if (data) {
  // The data will come in in the format of [{ user_id: '<userId>' }, ...]
  // So first map it so it's just an array of strings
  const justStrings = data.map(d => d.user_id);

  // Now filter allPlayers to include everyone that made a submission for week 1
  const actualPlayers = allPlayers.filter(p => justStrings.includes(p.id));
  console.log(`There are now ${actualPlayers.length} players in the file`);
  const playersAsJson = JSON.stringify(actualPlayers, null, 2);
  await writeFile(path.resolve(`data/${year}/football/players.json`), playersAsJson);
  console.log(`Updated the file at data/${year}/football/players.json in order to keep track of the players results`);
}

process.exit();
