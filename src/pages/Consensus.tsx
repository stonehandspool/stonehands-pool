import { useState } from 'react';
import ConfidenceReport from '../components/consensus/ConfidenceReport';
import HighFiveReport from '../components/consensus/HighFiveReport';
import MarginReport from '../components/consensus/MarginReport';
import SurvivorReport from '../components/consensus/SurvivorReport';
import { CURRENT_YEAR, CURRENT_WEEK, CURRENT_WEEK_STATUS, CURRENT_WEEK_CUTOFF_TIME } from '../constants';
import { useWeeklyPick } from '../utils/useWeeklyPicks';

enum Pools {
  Confidence,
  Survivor,
  Margin,
  HighFive,
}

function Consensus() {
  const [activeChoice, setActiveChoice] = useState(Pools.Confidence);

  const weeklyPicks = useWeeklyPick(CURRENT_WEEK);
  const pickData = weeklyPicks.length > 0 ? weeklyPicks[0].picks : [];

  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showCurrentWeek = CURRENT_WEEK_STATUS !== 'START' && currentTime > CURRENT_WEEK_CUTOFF_TIME;
  const weekToShow = CURRENT_WEEK === 1 ? CURRENT_WEEK : showCurrentWeek ? CURRENT_WEEK : CURRENT_WEEK - 1;

  const showChoice = (choice: Pools) => {
    setActiveChoice(choice);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">{CURRENT_YEAR} Stonehands Pool</h1>
        <h2 className="subtitle has-text-centered">Consensus Reports for the pool (Season and Week {CURRENT_WEEK})</h2>
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={activeChoice === Pools.Confidence ? 'is-active' : ''}>
              <a
                onClick={() => {
                  showChoice(Pools.Confidence);
                }}
              >
                <span>Confidence</span>
              </a>
            </li>
            <li className={activeChoice === Pools.Survivor ? 'is-active' : ''}>
              <a
                onClick={() => {
                  showChoice(Pools.Survivor);
                }}
              >
                <span>Survivor</span>
              </a>
            </li>
            <li className={activeChoice === Pools.Margin ? 'is-active' : ''}>
              <a
                onClick={() => {
                  showChoice(Pools.Margin);
                }}
              >
                <span>Margin</span>
              </a>
            </li>
            <li className={activeChoice === Pools.HighFive ? 'is-active' : ''}>
              <a
                onClick={() => {
                  showChoice(Pools.HighFive);
                }}
              >
                <span>High-Five</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="container">
          {activeChoice === Pools.Confidence && (
            <ConfidenceReport weeklyPicks={pickData} showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
          )}
          {activeChoice === Pools.Survivor && (
            <SurvivorReport weeklyPicks={pickData} showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
          )}
          {activeChoice === Pools.Margin && <MarginReport showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />}
          {activeChoice === Pools.HighFive && (
            <HighFiveReport weeklyPicks={pickData} showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Consensus;
