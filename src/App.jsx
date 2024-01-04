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
export default function App() {
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
