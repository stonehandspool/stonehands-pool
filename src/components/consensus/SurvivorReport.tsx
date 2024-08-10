import { DatabaseData } from '../../constants';
import SurvivorConsensusTable from './tables/SurvivorConsensusTable';

type SurvivorReportProps = {
  weeklyPicks: DatabaseData[];
  showCurrentWeek: boolean;
  weekToShow: number;
};

function SurvivorReport(props: SurvivorReportProps) {
  const { weeklyPicks, showCurrentWeek, weekToShow } = props;

  return (
    <div className="section">
      <div className="container pb-6">
        <h1 className="title">Week {weekToShow} Consensus Report</h1>
        <h2 className="subtitle">How many people picked each team in the survivor pool this week</h2>
        <SurvivorConsensusTable weeklyPicks={weeklyPicks} showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
      </div>
    </div>
  );
}

export default SurvivorReport;
