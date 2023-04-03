import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <NavBar />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
