import { MatchupInfo, UserInfo } from '../../constants';
import MarginAndSurvivorCard from './MarginAndSurvivorCard';

type MarginPickProps = {
  weekInfo: MatchupInfo[];
  userInfo: UserInfo;
  marginTeam: string | null;
  onUpdateMarginTeam: (teamName: string) => void;
};

function MarginPick(props: MarginPickProps) {
  const { weekInfo, userInfo, marginTeam, onUpdateMarginTeam } = props;

  const findMatchupByTeam = (team: string | null) => {
    const matchup = weekInfo.find(match => match.homeTeam === team || match.awayTeam === team);
    return matchup !== undefined ? matchup : null;
  };

  const priorPickMatchupInfo = findMatchupByTeam(marginTeam);
  const priorPickGameCompleted = priorPickMatchupInfo && priorPickMatchupInfo.winner !== '' ? true : false;
  const currentTime = new Date();

  return (
    <div className="container">
      <div className="block">
        <h3 className="title is-3">Margin Pick</h3>
        <h4 className="subtitle">
          Pick one team each week that you think will win by the most. If you are right, that teams winning margin is
          added to your margin pool score. If you are wrong, that teams losing margin is subtracted from your margin
          pool score. You can only choose each team <b>once</b> in the margin pool, so choose carefully! You cannot be
          eliminated from this pool.
        </h4>
      </div>
      <div className="block">
        {priorPickGameCompleted && (
          <h6 className="subtitle is-6 has-text-danger">
            Your choice from this week has already played their game. you can no longer change your pick
          </h6>
        )}
      </div>
      <div className="block">
        <div className="columns is-multiline">
          {weekInfo.map((matchup, index) => (
            <div className="column is-one-quarter" key={`margin_${index}`}>
              <MarginAndSurvivorCard
                key={`margin_tile_${index}`}
                name={'margin'}
                matchupInfo={matchup}
                selectedTeam={marginTeam}
                gameStarted={currentTime > new Date(matchup.time)}
                handleSelection={onUpdateMarginTeam}
                priorMarginPicks={userInfo.marginPicks}
                priorPickGameCompleted={priorPickGameCompleted}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarginPick;
