import { useEffect, useState } from 'react';

type ConfidenceDropDownProps = {
    numOptions: number;
    numGamesCompleted: number;
    matchupNumber: number;
    gameCompleted: boolean;
    priorConfidence: string;
    selectedNumbers: number[];
    onUpdateConfidence: Function;
};

function ConfidenceDropDown(props: ConfidenceDropDownProps) {
    const { numOptions, numGamesCompleted, matchupNumber, gameCompleted, priorConfidence, selectedNumbers, onUpdateConfidence } = props;

    const [currentValue, setCurrentValue] = useState<number>(-1);

    const options: number[] = Array.from({ length: numOptions }, (_, i) => i + 1);
    if (numGamesCompleted > 0) {
        options.splice(0, numGamesCompleted);
    }

    // If the user had previously submitted picks, update the rest of the dropdowns with that value
    useEffect(() => {
        if (priorConfidence) {
            const priorValue = parseInt(priorConfidence, 10);
            onUpdateConfidence(currentValue, priorValue);
            setCurrentValue(priorValue);
        }
    }, [priorConfidence]);

    const onChange = (e: any) => {
        e.preventDefault();

        const newValue = parseInt(e.target.value, 10);
        onUpdateConfidence(currentValue, newValue);
        setCurrentValue(newValue);
    };
    
    return (
        <div className='select is-small'>
            <select onChange={onChange} value={currentValue.toString()} name={`matchup-${matchupNumber}-confidence`} required={true} disabled={gameCompleted}>
                <option value={-1} disabled hidden></option>
                <option value={''}></option>
                {
                    options.map((number, index) => (
                        <option
                            key={`matchup-${matchupNumber}-option-${index}`}
                            value={number}
                            hidden={selectedNumbers.includes(number)}
                        >
                            {number}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default ConfidenceDropDown;