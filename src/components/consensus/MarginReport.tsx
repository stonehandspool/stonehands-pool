import MarginConsensusTable from './tables/MarginConsensusTable';

type MarginReportProps = {
  showCurrentWeek: boolean;
  weekToShow: number;
};

function MarginReport(props: MarginReportProps) {
  const { showCurrentWeek, weekToShow } = props;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Week {weekToShow} Consensus Report</h1>
        <h2 className="subtitle">How many people picked each team in the margin pool this week</h2>
        <MarginConsensusTable showCurrentWeek={showCurrentWeek} weekToShow={weekToShow} />
      </div>
    </div>
  );
}

export default MarginReport;
