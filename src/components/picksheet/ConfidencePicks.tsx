import { ConfidenceMatchupInfo, MatchupInfo } from '../../constants';
import ConfidenceCard from './ConfidenceCard';

type ConfidencePickProps = {
  weekInfo: MatchupInfo[];
  currentChoices: ConfidenceMatchupInfo[];
  isMobileOrTablet: boolean;
  onUpdateConfidenceTeam: (matchupId: string, team: string) => void;
  onUpdateConfidenceValue: (matchupId: string, confidence: number) => void;
  onClearConfidencePicks: () => void;
};

function ConfidencePicks(props: ConfidencePickProps) {
  const {
    weekInfo,
    currentChoices,
    isMobileOrTablet,
    onUpdateConfidenceTeam,
    onUpdateConfidenceValue,
    onClearConfidencePicks,
  } = props;
  const currentTime = new Date();

  return (
    <div className="container">
      <div className="block">
        <h3 className={`title ${isMobileOrTablet ? null : 'is-3'}`}>Confidence Picks</h3>
        <h4 className={`subtitle ${isMobileOrTablet ? 'is-6' : null}`}>
          Pick a winner for every game and assign points based off how confident you are they will win!{' '}
          {weekInfo.length} is the <b>most</b> confident while 1 is the <b>least</b> confident. If you are right, you
          will get that many points in the confidence pool. <b>{weekInfo.length} = best, 1 = worst!</b>
        </h4>
      </div>
      <div className="block is-flex is-justify-content-right">
        <button className="button is-primary" onClick={onClearConfidencePicks}>
          Reset Confidence Picks
        </button>
      </div>
      <div className="columns is-multiline">
        {weekInfo.map(matchup => {
          const { matchupId, time } = matchup;
          const matchupChoices = currentChoices.find(match => match.matchupId === matchupId)!;
          const selectedNumbers = currentChoices.map(match => match.confidence);
          const { team, confidence } = matchupChoices;
          return (
            <div
              className={`column ${isMobileOrTablet ? 'is-half' : 'is-one-quarter'}`}
              key={`${matchupId}_confidence_tile`}
            >
              <ConfidenceCard
                key={`${matchupId}_confidence`}
                matchupInfo={matchup}
                gameStarted={currentTime > new Date(time)}
                numGames={currentChoices.length}
                selectedNumbers={selectedNumbers}
                priorTeam={team}
                priorConfidence={confidence}
                onUpdateConfidenceTeam={onUpdateConfidenceTeam}
                onUpdateConfidenceValue={onUpdateConfidenceValue}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConfidencePicks;
