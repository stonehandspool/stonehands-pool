import { MatchupInfo, UserInfo } from '../../constants';
import MarginAndSurvivorCard from './MarginAndSurvivorCard';

type SurvivorPickProps = {
  weekInfo: MatchupInfo[];
  userInfo: UserInfo;
  survivorTeam: string | null;
  isMobileOrTablet: boolean;
  onUpdateSurvivorTeam: (teamName: string) => void;
};

function SurvivorPick(props: SurvivorPickProps) {
  const { weekInfo, userInfo, survivorTeam, isMobileOrTablet, onUpdateSurvivorTeam } = props;
  const { aliveInSurvivor } = userInfo;

  const findMatchupByTeam = (team: string | null) => {
    const matchup = weekInfo.find(match => match.homeTeam === team || match.awayTeam === team);
    return matchup !== undefined ? matchup : null;
  };

  const priorPickMatchupInfo = findMatchupByTeam(survivorTeam);
  const priorPickGameCompleted = priorPickMatchupInfo && priorPickMatchupInfo.winner !== '' ? true : false;
  const currentTime = new Date();

  if (!aliveInSurvivor) {
    return (
      <div className="container">
        <h3 className="title is-3">Survivor Pick</h3>
        <h4 className="subtitle">Sorry, you are no longer in the survivor pool, maybe next year!</h4>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="block">
        <h3 className={`title ${isMobileOrTablet ? null : 'is-3'}`}>Survivor Pick</h3>
        <h4 className={`subtitle ${isMobileOrTablet ? 'is-6' : null}`}>
          Pick one team each week that you are certain will win. You can only pick each team <b>once</b>. If you are
          right you will continue on to the next week, if you are wrong you are eliminated from the survivor pool, so be
          careful!
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
            <div className={`column ${isMobileOrTablet ? 'is-half' : 'is-one-quarter'}`} key={`survivor_${index}`}>
              <MarginAndSurvivorCard
                key={`survivor_tile_${index}`}
                name={'survivor'}
                matchupInfo={matchup}
                selectedTeam={survivorTeam}
                gameStarted={currentTime > new Date(matchup.time)}
                handleSelection={onUpdateSurvivorTeam}
                priorSurvivorPicks={userInfo.survivorPicks}
                priorPickGameCompleted={priorPickGameCompleted}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurvivorPick;
