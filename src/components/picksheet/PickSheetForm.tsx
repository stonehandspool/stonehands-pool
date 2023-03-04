import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';
import { dummyData, ValidPicks } from '../../temp/dummyData';
import ConfidencePicks from './ConfidencePicks';
import HighFivePicks from './HighFivePicks';
import MarginPick from './MarginPick';
import SurvivorPick from './SurvivorPick';
import TieBreaker from './TieBreaker';

type PicksheetFormProps = {
    session: Session;
};

export type choiceFormat = {
    [key: string]: string | number | string[];
    highFivePicks: string[];
    id: string;
    firstName: string;
    lastName: string;
    username: string;
};

function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function PickSheetForm(props: PicksheetFormProps) {
    const { session } = props;
    const navigate = useNavigate();

    const [selections, setSelections] = useState({});
    const [formError, setFormError] = useState<string | null>(null);
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const { id } = session.user;
        const { first_name: firstName, last_name: lastName, username } = session.user.user_metadata;
        const choices: choiceFormat = { id, firstName, lastName, username, 'highFivePicks': [] };
        for (let [key, value] of formData.entries()) {
            if (key === 'high-five-picks') {
                choices['highFivePicks'].push(value as string);
            } else {
                choices[key as keyof choiceFormat] = value as string | number; // as ValidPicks;
            }
        }

        // Probably a better way to go about this but oh well
        let missingConfidence = false;
        for (let i = 0; i < dummyData.length; i++) {
            if (!choices[`matchup-${i}-confidence`]) {
                setFormError('Please make sure you have chosen a confidence value for every matchup');
                missingConfidence = true;
                break;
            }
        }
        
        if (missingConfidence) {
            return;
        }

        // TODO: Add check to make sure that if they are eliminated they don't have to pick one
        if (!choices['survivor-pick']) {
            setFormError('Please make sure you have chosen a survivor pick');
            return;
        }

        if (!choices['margin-pick']) {
            setFormError('Please make sure you have chosen a margin pick');
            return;
        }

        if (!choices['highFivePicks'] || choices['highFivePicks'].length !== 5) {
            setFormError('Please make sure you have made all of your high five picks');
            return;
        }

        setSelections(choices);
        setFormError(null);

        const { data: picksheetSubmissionData, error: picksheetSubmissionError } = await supabaseClient
            .from(TABLE_NAMES.USER_PICKS)
            .insert({ id, week: 18, submission_data: choices })
            .select();

        if (picksheetSubmissionError) {
            setFormError('Something went wrong submitting your picksheet, please reach out to Ryan');
            return;
        }

        if (picksheetSubmissionData) {
            setFormError(null);
            navigate('/picksheet-success')
        }
    };

    return (
        <div className='picksheet-form-div'>
            <h1>Picksheet</h1>
            <form onSubmit={handleSubmit}>
                <h2>Confidence Picks:</h2>
                <ConfidencePicks />
                <h2>Survivor Pick:</h2>
                <SurvivorPick />
                <h2>Margin Pick:</h2>
                <MarginPick />
                <h2>High Five Picks:</h2>
                <HighFivePicks />
                <TieBreaker />
                <button>Submit Choices</button>
                {formError && formError.length > 0 && <p className='form-error'>{formError}</p>}
            </form>
        </div>
    );
}

export default PickSheetForm;