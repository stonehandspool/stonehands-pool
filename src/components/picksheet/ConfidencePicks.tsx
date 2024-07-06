import { MatchupInfo } from '../../constants';
import ConfidenceDropDown from './ConfidenceDropDown';
import MatchupCard from './MatchupCard';

type ConfidencePicksProps = {
  weekInfo: MatchupInfo[];
  priorPicks: any; // TODO: type this
  selectedPicks: any; // TODO: type this
  onUpdatePick: (value: string, index: number) => void;
  selectedConfidences: any; // TODO: type this
  onUpdateConfidence: (prevValue: number, newValue: number) => void;
};

function ConfidencePicks(props: ConfidencePicksProps) {
  const { weekInfo, priorPicks, selectedPicks, onUpdatePick, selectedConfidences, onUpdateConfidence } = props;
  const numOptions = Object.keys(weekInfo).length;
  const currentTime = new Date();

  return (
    <div className="container pb-6">
      <h3 className="title is-3">Confidence Picks:</h3>
      <h4 className="subtitle">
        Pick a winner for every game and assign points based off how confident you are they will win! {numOptions} is
        the <b>most</b> confident while 1 is the <b>least</b> confident. If you are right, you will get that many points
        in the confidence pool. <b>{numOptions} = best, 1 = worst!</b>
      </h4>
      <div className="columns is-multiline">
        {weekInfo.map((matchup, index) => {
          const priorChoice =
            Object.keys(priorPicks).length === 0 && priorPicks.constructor === Object
              ? null
              : priorPicks[`matchup-${index}`];
          const priorConfidence =
            Object.keys(priorPicks).length === 0 && priorPicks.constructor === Object
              ? null
              : priorPicks[`matchup-${index}-confidence`];
          return (
            <div className="column is-one-third" key={`confidence-${index}`}>
              <div className="box">
                <div className="columns is-centered is-multiline">
                  <div className="column is-full py-0 pl-3">
                    <p className="is-size-7 has-text-grey-light">{matchup.gameInfo}</p>
                  </div>
                  <div className="column is-three-fifths">
                    <MatchupCard
                      key={`card-${index}`}
                      homeTeam={matchup.homeTeam}
                      awayTeam={matchup.awayTeam}
                      matchupNumber={index}
                      gameStarted={currentTime > new Date(matchup.time)}
                      gameCompleted={matchup.winner !== ''}
                      priorChoice={priorChoice}
                      onUpdatePick={onUpdatePick}
                    />
                  </div>
                  <div className="column is-narrow is-vertical-center">
                    <ConfidenceDropDown
                      key={`dd-${index}`}
                      numOptions={numOptions}
                      gameStarted={currentTime > new Date(matchup.time)}
                      gameCompleted={matchup.winner !== ''}
                      priorConfidence={priorConfidence}
                      matchupChoice={selectedPicks[index]}
                      matchupNumber={index}
                      selectedNumbers={selectedConfidences}
                      onUpdateConfidence={onUpdateConfidence}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConfidencePicks;
