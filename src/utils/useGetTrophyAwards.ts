import { ReactNode, useEffect, useState } from 'react';

import trophyCaseData from '../../data/trophyCaseData.json';
import * as awards from '../assets/awards';

type TrophyCaseInfo = {
  trophyName: string;
  eligibleUsers: TrophyCaseUserInfo[];
};

type TrophyCaseUserInfo = {
  userId: string;
  pool?: string;
  place?: number;
  years?: number;
};

export const useGetTrophyAwards = (userId: string) => {
  const [trophyAwards, setTrophyAwards] = useState<ReactNode[]>([]);

  useEffect(() => {
    trophyCaseData.forEach((trophyInfo: TrophyCaseInfo) => {
      console.log(trophyInfo);
    });
    console.log(awards);
  }, [userId]);

  return trophyAwards;
};
