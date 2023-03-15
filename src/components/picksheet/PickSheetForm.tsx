import { Session } from '@supabase/supabase-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../config/supabaseClient';
import { TABLE_NAMES } from '../../config/supabaseConfig';
import { CURRENT_WEEK, CURRENT_YEAR } from '../../constants';
import * as seasonData from '../../../data/2022/season.json';
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

const currentWeekInfo = seasonData.weeks[`week_${CURRENT_WEEK}`];

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
        for (let i = 0; i < Object.keys(currentWeekInfo).length; i++) {
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

        if (!choices['tiebreaker']) {
            setFormError('Please make sure you have included a tiebreaker');
            return;
        }

        setSelections(choices);
        setFormError(null);

        const { data: picksheetSubmissionData, error: picksheetSubmissionError } = await supabaseClient
            .from(TABLE_NAMES.USER_PICKS)
            .insert({
                user_id: id,
                week: CURRENT_WEEK,
                year: CURRENT_YEAR,
                submission_data: choices
            })
            .select();

        if (picksheetSubmissionError) {
            console.error(picksheetSubmissionError);
            setFormError('Something went wrong submitting your picksheet, please reach out to Ryan');
            return;
        }

        if (picksheetSubmissionData) {
            setFormError(null);
            navigate('/picksheet-success')
        }
    };

    return (
        <section className='section'>
            <div className='container'>
                <h1 className='title is-1'>Week {CURRENT_WEEK} Picksheet</h1>
                <h2 className='subtitle'>Make sure to fill out every field that you can</h2>
                <form className='box' onSubmit={handleSubmit}>
                    <ConfidencePicks weekInfo={currentWeekInfo} />
                    <SurvivorPick weekInfo={currentWeekInfo} />
                    <MarginPick weekInfo={currentWeekInfo} />
                    <HighFivePicks weekInfo={currentWeekInfo} />
                    <TieBreaker />
                    <div className='field'>
                        <div className='control'>
                            <button className='button is-primary'>Submit Choices</button>
                        </div>
                    </div>
                    {formError && formError.length > 0 && <p className=''>{formError}</p>}
                </form> 
            </div>
        </section>
    );
}

export default PickSheetForm;