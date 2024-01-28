import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
const About = lazy(() => import('./pages/About'));
const Consensus = lazy(() => import('./pages/Consensus'));
const HighFive = lazy(() => import('./pages/HighFive'));
const Home = lazy(() => import('./pages/Home'));
const Margin = lazy(() => import('./pages/Margin'));
const PersonalStats = lazy(() => import('./pages/PersonalStats'));
const PickSheet = lazy(() => import('./pages/PickSheet'));
const PickSheetSuccess = lazy(() => import('./pages/PickSheetSuccess'));
const SeasonStandings = lazy(() => import('./pages/SeasonStandings'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignUpSuccess = lazy(() => import('./pages/SignUpSuccess'));
const Survivor = lazy(() => import('./pages/Survivor'));
const WeeklyPicks = lazy(() => import('./pages/WeeklyPicks'));
const WeeklyPicksImages = lazy(() => import('./pages/WeeklyPicksImages'));
const WeeklyStandings = lazy(() => import('./pages/WeeklyStandings'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const PasswordResetRequest = lazy(() => import('./pages/PasswordResetRequest'));
const PasswordReset = lazy(() => import('./pages/PasswordReset'));
const StandingsByWeek = lazy(() => import('./pages/StandingsByWeek'));
const MarchMadnessPicksheet = lazy(() => import('./pages/MarchMadnessPicksheet'));
const MarchMadnessPicksheetSuccess = lazy(() => import('./pages/MarchMadnessPicksheetSuccess'));
const YearlyAwards = lazy(() => import('./pages/YearlyAwards'));
const Payouts = lazy(() => import('./pages/Payouts'));

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<></>}>
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
          <Route path='/standings-by-week' element={<StandingsByWeek />} />
          <Route path='/march-madness/picksheet' element={<MarchMadnessPicksheet />} />
          <Route path='/march-madness/picksheet-success' element={<MarchMadnessPicksheetSuccess />} />
          <Route path='/yearly-awards' element={<YearlyAwards />} />
          <Route path='/payouts' element={<Payouts />} />
          <Route path='/404' element={<PageNotFound />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
