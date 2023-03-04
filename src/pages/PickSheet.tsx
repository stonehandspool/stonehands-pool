import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PickSheetForm from '../components/picksheet/PickSheetForm';
import PickSheetLogin from '../components/picksheet/PickSheetLogin';
import supabaseClient from '../config/supabaseClient';

function PickSheet() {
    const navigate = useNavigate();

    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    return(
        <div className='page picksheet'>
            {!session ? <PickSheetLogin /> : <PickSheetForm session={session} />}
        </div>
    );
}

export default PickSheet;