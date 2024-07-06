import { MatchupInfo, UserInfo } from '../../constants';
import HighFiveCheckboxes from './HighFiveCheckBoxes';

const MAX_PICKS = 5;

type HighFivePicks = {
  weekInfo: MatchupInfo[];
  highFivePicks: string[];
  handleHighFiveSelection: Function;
};

function HighFivePicks(props: HighFivePicks) {
  const { weekInfo, highFivePicks, handleHighFiveSelection } = props;

  const currentTime = new Date();

  return (
    <div className="container pb-6">
      <h3 className="title is-3">High Five Picks:</h3>
      <h4 className="subtitle">
        Pick <strong>5</strong> teams you think will win this week, the more you get right the more points you get!
      </h4>
      <p className="pb-3">
        You have currently made{' '}
        <strong>
          {highFivePicks.length}/{MAX_PICKS}
        </strong>{' '}
        of your picks
      </p>
      <div className="columns is-multiline">
        {weekInfo.map((matchup, index) => (
          <div className="column is-one-quarter" key={`margin-container-${index}`}>
            <HighFiveCheckboxes
              key={`card-${index}`}
              homeTeam={matchup.homeTeam}
              awayTeam={matchup.awayTeam}
              gameInfo={matchup.gameInfo}
              gameStarted={currentTime > new Date(matchup.time)}
              gameCompleted={matchup.winner !== ''}
              matchupNumber={index}
              name={'high-five-picks'}
              handleSelection={handleHighFiveSelection}
              maxPicks={MAX_PICKS}
              picksArray={highFivePicks}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighFivePicks;
