import { useState } from 'react';

type ConfidenceDropDownProps = {
    numOptions: number;
    matchupNumber: number;
    selectedNumbers: number[];
    onUpdateConfidence: Function;
};

function ConfidenceDropDown(props: ConfidenceDropDownProps) {
    const { numOptions, matchupNumber, selectedNumbers, onUpdateConfidence } = props;

    const [currentValue, setCurrentValue] = useState<number>(-1);

    const options: number[] = Array.from({ length: numOptions }, (_, i) => i + 1);

    const onChange = (e: any) => {
        e.preventDefault();

        const newValue = parseInt(e.target.value, 10);
        onUpdateConfidence(currentValue, newValue);
        setCurrentValue(newValue);
    };
    
    return (
        <select className='confidence-select' onChange={onChange} value={currentValue.toString()} name={`matchup-${matchupNumber}-confidence`} required={true}>
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
    );
}

export default ConfidenceDropDown;