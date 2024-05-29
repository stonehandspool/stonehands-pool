import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import PickSheetForm from '../components/marchmadness/PickSheetForm';
import PickSheetLogin from '../components/picksheet/PickSheetLogin';
import supabaseClient from '../config/supabaseClient';

function PickSheet() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <>{!session ? <PickSheetLogin /> : <PickSheetForm session={session} />}</>;
}

export default PickSheet;
