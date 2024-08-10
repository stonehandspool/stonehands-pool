import { DatabaseData } from '../../constants';
import HighFiveConsensusTable from './tables/HighFiveConsensusTable';

type HighFiveReportProps = {
  weeklyPicks: DatabaseData[];
  showCurrentWeek: boolean;
  weekToShow: number;
};

function HighFiveReport(props: HighFiveReportProps) {
  const { weeklyPicks, showCurrentWeek, weekToShow } = props;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Week {weekToShow} Consensus Report</h1>
        <h2 className="subtitle">How many times each team was picked this week in the high five pool</h2>
        <HighFiveConsensusTable weeklyPicks={weeklyPicks} showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
      </div>
    </div>
  );
}

export default HighFiveReport;
