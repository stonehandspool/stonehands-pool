import { ChangeEvent, useState } from 'react';

type ConfidenceDropDownProps = {
  numOptions: number;
  matchupChoice: string | null;
  matchupId: string;
  gameStarted: boolean;
  gameCompleted: boolean;
  priorConfidence: number;
  selectedNumbers: (number | null)[];
  onUpdateConfidence: (matchupId: string, confidence: number) => void;
};

function ConfidenceDropDown(props: ConfidenceDropDownProps) {
  const {
    numOptions,
    matchupChoice,
    matchupId,
    gameStarted,
    gameCompleted,
    priorConfidence,
    selectedNumbers,
    onUpdateConfidence,
  } = props;

  const [currentValue, setCurrentValue] = useState<number>(-1);
  const options: number[] = Array.from({ length: numOptions }, (_, i) => i + 1);

  if (priorConfidence !== currentValue) {
    setCurrentValue(priorConfidence);
  }

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const selectedValue = parseInt(event.target.value, 10);
    onUpdateConfidence(matchupId, selectedValue);
    setCurrentValue(selectedValue);
  };

  const shouldDisable = gameStarted || gameCompleted;

  return (
    <div className="select is-small">
      <select
        onChange={onChange}
        value={currentValue}
        name={`${matchupId}_confidence`}
        required={true}
        disabled={shouldDisable || matchupChoice === null}
      >
        <option value={-1} disabled hidden></option>
        <option value={''}></option>
        {options.map((number, index) => (
          <option
            key={`${matchupId}_option_${index}`}
            value={number}
            hidden={selectedNumbers.includes(number)}
            disabled={selectedNumbers.includes(number)}
          >
            {number}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ConfidenceDropDown;
