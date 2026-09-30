import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import ConfidenceTooltip from './ConfidenceTooltip';

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

  const shouldDisable = gameStarted || gameCompleted;
  const isDisabled = shouldDisable || matchupChoice === null;
  const timeoutRef = useRef<number | null>(null);
  const [currentValue, setCurrentValue] = useState<number>(-1);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const options: number[] = Array.from({ length: numOptions }, (_, i) => i + 1);

  if (priorConfidence !== currentValue) {
    setCurrentValue(priorConfidence);
  }

  const handleWrapperClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isDisabled) {
      setTooltipVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setTooltipVisible(false);
      }, 3000);
    }
  };

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();

    const selectedValue = parseInt(event.target.value, 10);
    onUpdateConfidence(matchupId, selectedValue);
    setCurrentValue(selectedValue);
  };

  return (
    <div
      className="select is-small"
      style={{ cursor: isDisabled ? 'not-allowed' : 'default' }}
      onClick={handleWrapperClick}
    >
      <ConfidenceTooltip text="You need to choose a team before choosing a point value" isVisible={tooltipVisible}>
        <select
          onChange={onChange}
          value={currentValue}
          name={`${matchupId}_confidence`}
          required={true}
          disabled={isDisabled}
          style={{ pointerEvents: isDisabled ? 'none' : 'auto' }}
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
      </ConfidenceTooltip>
    </div>
  );
}

export default ConfidenceDropDown;
