import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import supabaseClient from '../config/supabaseClient';
import PickSheetLogin from '../components/picksheet/PickSheetLogin';
import UserBracket from './UserBracket';

function MyBracket() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {!session && <PickSheetLogin />}
      {session && <UserBracket session={session} />}
    </>
  );
}

export default MyBracket;
