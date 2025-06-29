import _ from 'lodash';
import { useState } from 'react';
import { MarchMadnessMatchupInfo } from '../../constants';

interface MatchupCardProps {
  matchupInfo: MarchMadnessMatchupInfo;
  customClass?: string;
  onClick: (matchupInfo: MarchMadnessMatchupInfo) => void;
}

function MatchupCard(props: MatchupCardProps) {
  const { matchupInfo, customClass = '', onClick } = props;
  const { topTeam, bottomTeam } = matchupInfo;
  const [selectedTeam, setSelectedTeam] = useState<'top' | 'bottom' | null>(null);
  const [currentMatchupInfo, setCurrentMatchupInfo] = useState<MarchMadnessMatchupInfo | null>(null);

  // If a user changes an earlier pick, we want to make sure that we de-select our current selection
  // If it has been cleared (so that TBD is no longer bolded)
  if (!_.isEqual(currentMatchupInfo, matchupInfo)) {
    // If the new matchup info is different then update our saved state of that and reset selection
    setCurrentMatchupInfo(matchupInfo);
    if (selectedTeam !== null && selectedTeam !== matchupInfo.winner) {
      // Only reset the selected the prior losing team has changed
      setSelectedTeam(null);
    } else if (selectedTeam === null) {
      // If getting data from prior picks, bold the previously chosen winners
      setSelectedTeam(matchupInfo.winner);
    }
  }

  const chooseTeam = (direction: 'top' | 'bottom') => {
    if (
      (direction === 'top' && matchupInfo.topTeam.name === null) ||
      (direction === 'bottom' && matchupInfo.bottomTeam.name === null)
    ) {
      return;
    }
    const matchupCopy = _.cloneDeep(matchupInfo);
    matchupCopy.winner = direction;
    setCurrentMatchupInfo(matchupCopy);
    setSelectedTeam(direction);
    onClick(matchupCopy);
  };

  return (
    <div className={`box march-madness ${customClass} p-3 mb-3`}>
      <div
        className="field is-clickable mb-0"
        onClick={() => {
          chooseTeam('top');
        }}
      >
        <div className="columns">
          <div className="column is-1">
            <span className="has-text-weight-bold is-size-7">{topTeam.seed}</span>
          </div>
          <div className="column pl-2">
            <span className={selectedTeam === 'top' ? 'has-text-weight-bold' : 'has-text-weight-normal'}>
              {topTeam.name !== null ? topTeam.name : 'TBD'} {topTeam.record !== null ? `(${topTeam.record})` : ''}
            </span>
          </div>
        </div>
      </div>
      <div
        className="field is-clickable mb-0"
        onClick={() => {
          chooseTeam('bottom');
        }}
      >
        <div className="columns">
          <div className="column is-1">
            <span className="has-text-weight-bold is-size-7">{bottomTeam.seed}</span>
          </div>
          <div className="column pl-2">
            <span className={selectedTeam === 'bottom' ? 'has-text-weight-bold' : 'has-text-weight-normal'}>
              {bottomTeam.name !== null ? bottomTeam.name : 'TBD'}{' '}
              {bottomTeam.record !== null ? `(${bottomTeam.record})` : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchupCard;
