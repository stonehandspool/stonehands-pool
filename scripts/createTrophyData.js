import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile } from 'fs/promises';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
// TODO this needs to be the service role key and cannot get committed!!!
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZXJ3eWp6b2piamNkdHR0ZWhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MzIyNzI3MCwiZXhwIjoxOTg4ODAzMjcwfQ.p5eyHeIWEwqa1UBhslu1yWQGCnLoCbHdXv2nmoSVAuo';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

const trophyCaseData = [
  {
    trophyName: 'foundingMember',
    eligibleUsers: [],
  },
  {
    trophyName: 'yearsAsMember',
    eligibleUsers: [],
  },
  {
    trophyName: 'firstPlace',
    eligibleUsers: [],
  },
  {
    trophyName: 'secondPlace',
    eligibleUsers: [],
  },
  {
    trophyName: 'thirdPlace',
    eligibleUsers: [],
  },
  {
    trophyName: 'fourthPlace',
    eligibleUsers: [],
  },
  {
    trophyName: 'fifthPlace',
    eligibleUsers: [],
  },
  {
    trophyName: 'secretMango',
    eligibleUsers: [],
  },
  {
    trophyName: 'secretMurphy',
    eligibleUsers: [],
  },
];

const {
  data: { users },
  error,
} = await supabaseClient.auth.admin.listUsers({ page: 1, perPage: 1000 });

if (error) {
  console.log('An error occurred when trying to connect to supabase');
  console.log(error);
  process.exit();
}

// First create the data for the founding members
const { players: originalMembers } = await JSON.parse(await readFile(path.resolve(`data/2023/players.json`)));
originalMembers.forEach(member => {
  trophyCaseData[0].eligibleUsers.push(member.id);
});

// Now get the number of years for each user
users.forEach(userInfo => {
  const { created_at: signUpDate, id } = userInfo;
  const ageDiff = Date.now() - new Date(signUpDate);
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  trophyCaseData[1].eligibleUsers.push({ id: id, years: age + 1 });
});

const trophyDatasAsJson = JSON.stringify(trophyCaseData, null, 2);
await writeFile(path.resolve(`data/trophyCaseData.json`), trophyDatasAsJson);
console.log(`Created a new file at data/trophyCaseData.json in order to keep track of the players results`);

process.exit();
