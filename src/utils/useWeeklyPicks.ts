import { useEffect, useState } from 'react';
import { CURRENT_YEAR, DatabaseData } from '../constants';

type WeeklyPickJsonData = {
  id: string;
  picks: DatabaseData[];
};

export const useWeeklyPick = (weekStart: number, weekEnd?: number) => {
  const [weeklyPicks, setWeeklyPicks] = useState<WeeklyPickJsonData[]>([]);

  useEffect(() => {
    let ignore = false;
    const getPicksForWeek = async (week: number) => {
      const picksForWeek: WeeklyPickJsonData = await import(
        `../../data/${CURRENT_YEAR}/football/weeklyPicks/week${week}.json`
      );
      if (!ignore) {
        setWeeklyPicks([picksForWeek]);
      }
    };

    const getPicksInRange = async (firstWeek: number, secondWeek: number) => {
      const picksInRange: WeeklyPickJsonData[] = [];
      for (let i = firstWeek; i <= secondWeek; i++) {
        const picksForWeek: WeeklyPickJsonData = await import(
          `../../data/${CURRENT_YEAR}/football/weeklyPicks/week${i}.json`
        );
        picksInRange.push(picksForWeek);
      }
      if (!ignore) {
        setWeeklyPicks(picksInRange);
      }
    };

    if (weekEnd !== undefined) {
      getPicksInRange(weekStart, weekEnd).catch(err => {
        console.log(err);
      });
    } else {
      getPicksForWeek(weekStart).catch(err => {
        console.log(err);
      });
    }

    return () => {
      ignore = true;
    };
  }, [weekStart, weekEnd]);

  return weeklyPicks;
};
