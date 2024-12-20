import { ReactNode, useMemo, useState } from 'react';

import trophyCaseData from '../../data/trophyCaseData.json';
import FoundingMember from '../assets/awards/FoundingMember';
import YearCounter from '../assets/awards/YearCounter';
import GoldMedal from '../assets/awards/GoldMedal';
import SilverMedal from '../assets/awards/SilverMedal';
import BronzeMedal from '../assets/awards/BronzeMedal';
import TopFiveMedal from '../assets/awards/TopFiveMedal';
import SecretMango from '../assets/awards/SecretMango';
import SecretMurphy from '../assets/awards/SecretMurphy';
import MrThursday from '../assets/awards/MrThursday';
import LoneWolf from '../assets/awards/LoneWolf';

type TrophyCaseInfo = {
  trophyName: string;
  eligibleUsers: TrophyCaseUserInfo[];
};

type BaseTrophyInfo = {
  userId: string;
};

type YearCounterTrophyInfo = {
  userId: string;
  years: number;
};

type MedalTrophyInfo = {
  userId: string;
  pool: string;
  year: number;
};

type TopFiveTrophyInfo = {
  userId: string;
  pool: string;
  year: number;
  place: number;
};

type LoneWolfTrophyInfo = {
  userId: string;
  team: string;
  week: number;
  year: number;
};

type TrophyCaseUserInfo =
  | BaseTrophyInfo
  | YearCounterTrophyInfo
  | MedalTrophyInfo
  | TopFiveTrophyInfo
  | LoneWolfTrophyInfo;

const createTrophy = (trophyName: string, trophyProps: TrophyCaseUserInfo) => {
  let trophy;
  switch (trophyName) {
    case 'foundingMember': {
      trophy = <FoundingMember key={'Founding Member Trophy'} />;
      break;
    }
    case 'yearsAsMember': {
      const { years } = trophyProps as YearCounterTrophyInfo;
      trophy = <YearCounter key={'Year Counter Trophy'} years={years} />;
      break;
    }
    case 'firstPlace': {
      const { pool, year } = trophyProps as MedalTrophyInfo;
      trophy = <GoldMedal key={'Gold Medal Trophy'} pool={pool} year={year} />;
      break;
    }
    case 'secondPlace': {
      const { pool, year } = trophyProps as MedalTrophyInfo;
      trophy = <SilverMedal key={'Silver Medal Trophy'} pool={pool} year={year} />;
      break;
    }
    case 'thirdPlace': {
      const { pool, year } = trophyProps as MedalTrophyInfo;
      trophy = <BronzeMedal key={'Gold Medal Trophy'} pool={pool} year={year} />;
      break;
    }
    case 'topFive': {
      const { pool, year, place } = trophyProps as TopFiveTrophyInfo;
      trophy = <TopFiveMedal key={'Top Five Trophy'} pool={pool} year={year} place={place} />;
      break;
    }
    case 'secretMango': {
      trophy = <SecretMango key={'Secret Mango Trophy'} />;
      break;
    }
    case 'secretMurphy': {
      trophy = <SecretMurphy key={'Secret Murphy Trophy'} />;
      break;
    }
    case 'mrThursday': {
      trophy = <MrThursday key={'Mr Thursday Trophy'} />;
      break;
    }
    case 'loneWolf':
      const { team, week, year } = trophyProps as LoneWolfTrophyInfo;
      trophy = <LoneWolf key={'Lone Wolf Trophy'} team={team} week={week} year={year} />;
      break;
    default: {
      console.log(`Something went wrong creating a trophy with the name: ${trophyName}`);
      break;
    }
  }

  return trophy;
};

export const useGetTrophyAwards = (userId: string) => {
  const [trophyAwards, setTrophyAwards] = useState<ReactNode[]>([]);

  useMemo(() => {
    trophyCaseData.forEach((trophyInfo: TrophyCaseInfo) => {
      const { trophyName, eligibleUsers } = trophyInfo;
      const eligibleForTrophy = eligibleUsers.findIndex(eligibleUser => eligibleUser.userId === userId) !== -1;
      if (eligibleForTrophy) {
        const userInfo = eligibleUsers.find(eligibleUser => eligibleUser.userId === userId)!;
        const trophy = createTrophy(trophyName, userInfo);
        setTrophyAwards(prevTrophies => [...prevTrophies, trophy]);
      }
    });
  }, [userId]);

  return trophyAwards;
};
