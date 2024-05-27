import {
  CURRENT_WEEK,
  CURRENT_WEEK_CUTOFF_TIME,
  CURRENT_WEEK_STATUS,
} from "../../constants";
import HighFiveConsensusTable from "./tables/HighFiveConsensusTable";

function HighFiveReport() {
  // We want to make sure that everyones weekly picks only show up once the cutoff has occurred so that other players
  // can't see what people have chosen prior to the cutoff happening
  const currentTime = new Date();
  const showCurrentWeek =
    CURRENT_WEEK_STATUS !== "START" && currentTime > CURRENT_WEEK_CUTOFF_TIME;
  const weekToShow =
    CURRENT_WEEK === 1
      ? CURRENT_WEEK
      : showCurrentWeek
        ? CURRENT_WEEK
        : CURRENT_WEEK - 1;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Week {weekToShow} Consensus Report</h1>
        <h2 className="subtitle">
          How many times each team was picked this week in the high five pool
        </h2>
        <HighFiveConsensusTable />
      </div>
    </div>
  );
}

export default HighFiveReport;
