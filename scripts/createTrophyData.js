import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import { readFile, writeFile } from 'fs/promises';

const supabaseUrl = 'https://omerwyjzojbjcdtttehi.supabase.co';
// TODO this needs to be the service role key and cannot get committed!!!
const supabaseAnonKey = '';
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
  {
    trophyName: 'mostLoyal',
    eligibleUsers: [
      {
        userId: 'f9a6ca4b-7169-4a26-9958-2a4c9ecf4a17',
        team: 'SF',
        years: [2023],
      },
      {
        userId: 'dac48951-5b5c-48c9-b68f-c8b622c9ad40',
        team: 'SF',
        years: [2023],
      },
      {
        userId: 'ad50c309-eaab-4650-8f03-3828d72eac50',
        team: 'SF',
        years: [2023],
      },
      {
        userId: '11642444-4a38-42b3-8f2f-01b34bb50aef',
        team: 'SF',
        years: [2023],
      },
      {
        userId: 'ac5d7aa9-47d3-4157-a319-5e4ec34dc4a6',
        team: 'SF',
        years: [2023],
      },
      {
        userId: '803138fa-9259-4226-be1b-3d3c002c7c1a',
        team: 'SF',
        years: [2023],
      },
      {
        userId: '7560beb5-f98f-493a-b226-c711952ecc7a',
        team: 'SF',
        years: [2023],
      },
      {
        userId: 'd42850f1-bdd7-484b-88cc-8d58df10d63a',
        team: 'SF',
        years: [2023],
      },
      {
        userId: '02bee9d4-ea65-4930-801b-91eb457b39d1',
        team: 'SF',
        years: [2023],
      },
      {
        userId: '272dffc9-a5d7-410e-844a-48bae148cf32',
        team: 'KC',
        years: [2023],
      },
      {
        userId: '6fcd546a-6aeb-4fb6-b99e-aa035c1af58e',
        team: 'KC',
        years: [2023],
      },
      {
        userId: '1af52a92-0242-491e-87f5-c166fa2fa730',
        team: 'KC',
        years: [2023],
      },
      {
        userId: '4943d53f-5a0f-44aa-8532-5a11bac66783',
        team: 'KC',
        years: [2023],
      },
      {
        userId: '95691265-52cc-4c61-8aa4-7dc4586dce3e',
        team: 'KC',
        years: [2023],
      },
      {
        userId: '71cab27c-2f20-4ec9-bc0d-fe7d9988b528',
        team: 'KC',
        years: [2023],
      },
      {
        userId: '1ca93cf7-e957-4cf5-9745-71b1018764fe',
        team: 'MIA',
        years: [2023],
      },
      {
        userId: 'd9985b83-08de-4e96-bcbc-e348666a554c',
        team: 'MIA',
        years: [2023],
      },
      {
        userId: 'ed2ad1cc-e7db-406f-956e-bd3ff933f37e',
        team: 'PHI',
        years: [2023],
      },
      {
        userId: '118b0007-ed0b-445e-b2fa-70d6d97ee7f3',
        team: 'PHI',
        years: [2023],
      },
      {
        userId: '8a2fd044-ed39-490a-9331-3ccb6c6b4d67',
        team: 'DAL',
        years: [2023],
      },
      {
        userId: 'f9d2b133-04b5-4b17-be87-99dac41d7f91',
        team: 'PIT',
        years: [2023],
      },
      {
        userId: 'dc6fb755-76be-483a-bc8e-cc17e138367f',
        team: 'NYJ',
        years: [2023],
      },
      {
        userId: '36061310-5718-49b2-9d16-99768bcc4aa3',
        team: 'GB',
        years: [2023],
      },
      {
        userId: '2c470e65-6165-4807-bfea-3071c51716a3',
        team: 'BAL',
        years: [2023],
      },
    ],
  },
  {
    trophyName: 'haters',
    eligibleUsers: [
      {
        userId: 'f9a6ca4b-7169-4a26-9958-2a4c9ecf4a17',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: 'dac48951-5b5c-48c9-b68f-c8b622c9ad40',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '50aab471-80e6-45fb-b81f-e6bdba3f3ff1',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '8a2fd044-ed39-490a-9331-3ccb6c6b4d67',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: 'd8d0e432-2d89-4f83-ae3a-d0e311059b44',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '4b957d37-eb28-4859-9bad-374dac2b7a4b',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: 'de33008f-ae64-4eef-8c6c-7fcd4b8a6b3a',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '11642444-4a38-42b3-8f2f-01b34bb50aef',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '793198f9-cc44-4857-8864-87b2cb2833f5',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '8da0fe25-fbc7-414d-89f9-bfe0fada05d3',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: 'dc6fb755-76be-483a-bc8e-cc17e138367f',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: 'Peter Misiaszek',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
      },
      {
        userId: '',
        team: 'CAR',
        years: [2023],
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
