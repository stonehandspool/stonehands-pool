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
    eligibleUsers: [
      {
        userId: 'ad50c309-eaab-4650-8f03-3828d72eac50',
        pool: 'Confidence',
        year: 2023,
      },
      {
        userId: '36061310-5718-49b2-9d16-99768bcc4aa3',
        pool: 'Survivor',
        year: 2023,
      },
      {
        userId: '3cd5ef80-6348-407b-bd5c-6477f49c322e',
        pool: 'Margin',
        year: 2023,
      },
      {
        userId: '8b94838f-9e4c-45b0-99ea-f5d1104d4f1a',
        pool: 'High Five',
        year: 2023,
      },
    ],
  },
  {
    trophyName: 'secondPlace',
    eligibleUsers: [
      {
        userId: '0869826a-9ee4-4001-8142-f213f7504cc2',
        pool: 'Confidence',
        year: 2023,
      },
      {
        userId: '549b94f3-bbdb-49e2-9431-7de82d723f58',
        pool: 'Margin',
        year: 2023,
      },
      {
        userId: 'ad50c309-eaab-4650-8f03-3828d72eac50',
        pool: 'High Five',
        year: 2023,
      },
      {
        userId: '1c2c4e7e-c5b8-44a1-bf3a-dbf7449ddb14',
        pool: 'High Five',
        year: 2023,
      },
    ],
  },
  {
    trophyName: 'thirdPlace',
    eligibleUsers: [
      {
        userId: 'dac48951-5b5c-48c9-b68f-c8b622c9ad40',
        pool: 'Confidence',
        year: 2023,
      },
      {
        userId: 'd50c6628-596f-4c11-a9b2-43775b1ab69f',
        pool: 'Margin',
        year: 2023,
      },
    ],
  },
  {
    trophyName: 'topFive',
    eligibleUsers: [
      {
        userId: 'f9a6ca4b-7169-4a26-9958-2a4c9ecf4a17',
        pool: 'Confidence',
        place: 4,
        year: 2023,
      },
      {
        userId: '4943d53f-5a0f-44aa-8532-5a11bac66783',
        pool: 'Margin',
        place: 4,
        year: 2023,
      },
      {
        userId: '4b957d37-eb28-4859-9bad-374dac2b7a4b',
        pool: 'High Five',
        place: 4,
        year: 2023,
      },
      {
        userId: '891b628d-34ef-4959-a722-c4b467c24cae',
        pool: 'Confidence',
        place: 5,
        year: 2023,
      },
      {
        userId: 'ff856cea-b8cb-470e-91ec-0fb8149f7fdb',
        pool: 'Margin',
        place: 5,
        year: 2023,
      },
      {
        userId: 'dfcfd92c-5284-4093-8031-00eddbb19dde',
        pool: 'High Five',
        place: 5,
        year: 2023,
      },
    ],
  },
  {
    trophyName: 'secretMango',
    eligibleUsers: [
      {
        userId: 'd9985b83-08de-4e96-bcbc-e348666a554c',
      },
      {
        userId: '3cd5ef80-6348-407b-bd5c-6477f49c322e',
      },
      {
        userId: 'a55189bd-505f-4b33-95fb-897d259fe149',
      },
      {
        userId: '9afffce2-a8dd-424d-b522-e60b68fc956f',
      },
      {
        userId: '32df21b5-d57b-4477-9f94-1ec20edbd2e5',
      },
      {
        userId: 'd42850f1-bdd7-484b-88cc-8d58df10d63a',
      },
    ],
  },
  {
    trophyName: 'secretMurphy',
    eligibleUsers: [
      {
        userId: 'd42850f1-bdd7-484b-88cc-8d58df10d63a',
      },
      {
        userId: 'f9a6ca4b-7169-4a26-9958-2a4c9ecf4a17',
      },
    ],
  },
  {
    trophyName: 'mrThursday',
    eligibleUsers: [
      {
        userId: 'dc6fb755-76be-483a-bc8e-cc17e138367f',
      },
    ],
  },
  {
    trophyName: 'loneWolf',
    eligibleUsers: [
      {
        userId: 'aceb39ff-150c-48ee-a879-41c21c6a7382',
        team: 'IND',
        week: 3,
        year: 2023,
      },
      {
        userId: '1ca93cf7-e957-4cf5-9745-71b1018764fe',
        team: 'CLE',
        week: 10,
        year: 2023,
      },
      {
        userId: 'd42850f1-bdd7-484b-88cc-8d58df10d63a',
        team: 'ATL',
        week: 2,
        year: 2024,
      },
    ],
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
  trophyCaseData[0].eligibleUsers.push({ userId: member.id });
});

// Now get the number of years for each user
users.forEach(userInfo => {
  const { created_at: signUpDate, id } = userInfo;
  const ageDiff = Date.now() - new Date(signUpDate);
  const ageDate = new Date(ageDiff);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  trophyCaseData[1].eligibleUsers.push({ userId: id, years: age + 1 });
});

const trophyDatasAsJson = JSON.stringify(trophyCaseData, null, 2);
await writeFile(path.resolve(`data/trophyCaseData.json`), trophyDatasAsJson);
console.log(`Created a new file at data/trophyCaseData.json in order to keep track of the players results`);

process.exit();
