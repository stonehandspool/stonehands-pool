import { ChangeEvent } from 'react';

type TieBreakerProps = {
  finalGame: string;
  lastGameCompleted: boolean;
  tiebreaker: string;
  isMobileOrTablet: boolean;
  onUpdateTiebreaker: (event: ChangeEvent<HTMLInputElement>) => void;
};

function TieBreaker(props: TieBreakerProps) {
  const { finalGame, lastGameCompleted, tiebreaker, isMobileOrTablet, onUpdateTiebreaker } = props;

  return (
    <div className="container">
      <div className="block">
        <h3 className={`title ${isMobileOrTablet ? null : 'is-3'}`}>Tiebreaker</h3>
        <h4 className={`subtitle ${isMobileOrTablet ? 'is-6' : null}`}>
          Please enter what you think the combined score will be in the Monday night game ({finalGame})
        </h4>
      </div>
      <div className="block">
        <div className="columns">
          <div className="column is-1">
            <input
              className="input"
              type="text"
              id="tiebreaker"
              name="tiebreaker"
              disabled={lastGameCompleted}
              value={tiebreaker}
              onChange={onUpdateTiebreaker}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TieBreaker;
