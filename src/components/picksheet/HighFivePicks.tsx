import { MatchupInfo } from '../../constants';
import HighFiveCard from './HighFiveCard';

const MAX_PICKS = 5;

type HighFivePicks = {
  weekInfo: MatchupInfo[];
  highFivePicks: string[];
  onUpdateHighFiveTeams: (type: string, teamA: string, teamB?: string) => void;
};

function HighFivePicks(props: HighFivePicks) {
  const { weekInfo, highFivePicks, onUpdateHighFiveTeams } = props;

  const currentTime = new Date();

  return (
    <div className="container">
      <div className="block">
        <h3 className="title is-3">High Five Picks:</h3>
        <h4 className="subtitle">
          Pick <strong>5</strong> teams you think will win this week, the more you get right the more points you get!
        </h4>
      </div>
      <div className="block">
        <p className="pb-3">
          You have currently made{' '}
          <strong>
            {highFivePicks.length}/{MAX_PICKS}
          </strong>{' '}
          of your picks
        </p>
      </div>
      <div className="columns is-multiline">
        {weekInfo.map((matchup, index) => (
          <div className="column is-one-quarter" key={`margin-container-${index}`}>
            <HighFiveCard
              key={`card-${index}`}
              matchupInfo={matchup}
              gameStarted={currentTime > new Date(matchup.time)}
              handleSelection={onUpdateHighFiveTeams}
              picksArray={highFivePicks}
              maxPicks={MAX_PICKS}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighFivePicks;
