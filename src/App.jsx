import { Route, Routes } from 'react-router-dom';
import {
  Launcher,
  Hint,
  Categories,
  Setting,
  Questions,
  Result,
  Character,
  Storage,
  History,
  Info,
} from './exporter';
import useLocalStorage from './hooks/useLocalStorage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function App() {
  const matchData = useSelector((state) => state.matchData);
  const history = useSelector((state) => state.history);
  const setting = useSelector((state) => state.setting);

  const { setLocalStorage } = useLocalStorage();

  useEffect(() => {
    setLocalStorage('matchData', matchData);
    setLocalStorage('history', history);
    setLocalStorage('setting', setting);
  }, [matchData, history, setting]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Launcher />} />
        <Route path='/hint' element={<Hint />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/result' element={<Result />} />

        <Route path='/character' element={<Character />} />
        <Route path='/storage' element={<Storage />} />
        <Route path='/history' element={<History />} />
        <Route path='/info' element={<Info />} />
      </Routes>
    </>
  );
}
