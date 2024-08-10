import { DatabaseData } from '../../constants';
import ConfidenceWeeklyConsensusTable from './tables/ConfidenceWeeklyConsensusTable';
import ConfidenceYearlyConsensusTable from './tables/ConfidenceYearlyConsensusTable';

type ConfidenceReportProps = {
  weeklyPicks: DatabaseData[];
  showCurrentWeek: boolean;
  weekToShow: number;
};

function ConfidenceReport(props: ConfidenceReportProps) {
  const { weeklyPicks, showCurrentWeek, weekToShow } = props;

  return (
    <div className="section">
      <div className="container pb-6">
        <h1 className="title">Week {weekToShow} Consensus Report</h1>
        <h2 className="subtitle">
          How many people picked each team and how confident they were with that team in each matchup in week{' '}
          {weekToShow}.
        </h2>
        <ConfidenceWeeklyConsensusTable
          weeklyPicks={weeklyPicks}
          showCurrentWeek={showCurrentWeek}
          weekToShow={weekToShow}
        />
      </div>
      <div className="container">
        <h1 className="title">Yearly Consensus Report</h1>
        <h2 className="subtitle">How often a team is picked compared to their opponent throughout the season.</h2>
        <ConfidenceYearlyConsensusTable showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
      </div>
    </div>
  );
}

export default ConfidenceReport;
