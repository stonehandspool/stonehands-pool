import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import supabaseClient from './config/supabaseClient';

import NavBar from './components/NavBar';
import About from './pages/About';
import Consensus from './pages/Consensus';
import HighFive from './pages/HighFive';
import Home from './pages/Home';
import Margin from './pages/Margin';
import PersonalStats from './pages/PersonalStats';
import PickSheet from './pages/PickSheet';
import PickSheetSuccess from './pages/PickSheetSuccess';
import SeasonStandings from './pages/SeasonStandings';
import SignUp from './pages/SignUp';
import SignUpSuccess from './pages/SignUpSuccess';
import Survivor from './pages/Survivor';
import WeeklyPicks from './pages/WeeklyPicks';
import WeeklyPicksImages from './pages/WeeklyPicksImages';
import WeeklyStandings from './pages/WeeklyStandings';
import PageNotFound from './pages/PageNotFound';
import PasswordResetRequest from './pages/PasswordResetRequest';
import PasswordReset from './pages/PasswordReset';
import { TABLE_NAMES } from './config/supabaseConfig';

function App() {
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [numJoined, setNumJoined] = useState(-1);

  useEffect(() => {
    const fetchNumJoined = async () => {
      const { data, error } = await supabaseClient
        .from(TABLE_NAMES.USER_INFO)
        .select('*', { count: 'exact' });
      
      if (data) {
        setNumJoined(data.length);
      }
    };

    fetchNumJoined();
  }, []);

  const removeNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <BrowserRouter>
      <NavBar />
      {
        (notificationVisible && numJoined > 0) &&
        <div className='columns is-centered mt-6'>
          <div className='column is-half'>
            <div className='notification is-info'>
              <button className='delete' onClick={removeNotification}></button>
              This is a friendly reminder that the last day for signing up is <b>Wednesday September 6<sup>th</sup></b>!
              Picksheets will become available on <b>Monday September 4<sup>th</sup></b> for those who are already signed up.
              The pool currently has <b>{numJoined}</b> members! If you haven't joined yet then sign up now and watch this counter
              go up! Don't forget to validate your email once you sign up.
            </div>
          </div>
        </div>
      }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/picksheet' element={<PickSheet />} />
        <Route path='/picksheet-success' element={<PickSheetSuccess />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-up-success' element={<SignUpSuccess />} />
        <Route path='/season-standings' element={<SeasonStandings />} />
        <Route path='/weekly-standings' element={<WeeklyStandings />} />
        <Route path='/survivor' element={<Survivor />} />
        <Route path='/margin' element={<Margin />} />
        <Route path='/high-five' element={<HighFive />} />
        <Route path='/weekly-picks' element={<WeeklyPicks />} />
        <Route path='/weekly-picks-images' element={<WeeklyPicksImages />} />
        <Route path='/user/:username' element={<PersonalStats />} />
        <Route path='/consensus' element={<Consensus />} />
        <Route path='/password-reset-request' element={<PasswordResetRequest />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/404' element={<PageNotFound />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
