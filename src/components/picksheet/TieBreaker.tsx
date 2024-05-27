import { ChangeEvent } from "react";

interface TieBreakerProps {
  finalGame: string;
  lastGameCompleted: boolean;
  tiebreaker: string;
  handleTiebreakerInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TieBreaker(props: TieBreakerProps) {
  const { finalGame, lastGameCompleted, tiebreaker, handleTiebreakerInput } =
    props;

  return (
    <div className="container pb-6">
      <h3 className="title is-3">Tiebreaker:</h3>
      <h4 className="subtitle">
        Please enter what you think the combined score will be in the Monday
        night game ({finalGame})
      </h4>
      <div className="field columns">
        <div className="control column is-1">
          <input
            className="input"
            type="text"
            id="tiebreaker"
            name="tiebreaker"
            disabled={lastGameCompleted}
            value={tiebreaker}
            onChange={handleTiebreakerInput}
          />
        </div>
      </div>
    </div>
  );
}

export default TieBreaker;
