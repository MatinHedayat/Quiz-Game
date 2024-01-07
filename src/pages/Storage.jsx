import Page from '../components/Page';
import { RiDatabase2Fill } from 'react-icons/ri';
import { MdHistory } from 'react-icons/md';
import { RxReset } from 'react-icons/rx';
import { IoIosHelpCircle } from 'react-icons/io';
import { clearHistory } from '../features/historySlice';
import { useDispatch, useSelector } from 'react-redux';
import { clearMatchData } from '../features/matchDataSlice';
import { resetSetting } from '../features/settingSlice';
import { logoutCharacter } from '../features/characterSlice';
import useTheme from '../hooks/useTheme';
import { useNavigate } from 'react-router-dom';

export default function Storage() {
  const { setTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetGame = () => {
    // dispatch(clearMatchData());
    // dispatch(clearHistory());
    // dispatch(resetSetting());
    // dispatch(logoutCharacter());
    // setTheme('light');
    localStorage.clear();
    navigate('/');
  };

  return (
    <Page title='Storage' footer={false}>
      <div className='text-gray-800 dark:text-gray-300 flex items-center gap-x-3'>
        <RiDatabase2Fill className='w-16 h-16' />
        <h2 className='text-2xl font-bold capitalize dark:text-gray-200'>
          Control game data and structure
        </h2>
      </div>

      <div className='flex flex-col gap-y-12 mt-12'>
        <div className='flex flex-col justify-between gap-y-4'>
          <p className='text-gray-800 dark:text-gray-300 font-medium leading-5 flex gap-x-2'>
            <IoIosHelpCircle className='w-8 text-2xl' />
            <span className='w-full'>
              Clearing the information of all played games located in the
              history
            </span>
          </p>

          <button
            className='bg-gray-700 font-semibold text-white dark:text-gray-300 tracking-widest w-4/6 sm:max-w-[50%] py-2.5 flex items-center justify-center gap-x-2.5 rounded shadow-xl'
            onClick={() => dispatch(clearHistory())}
          >
            <MdHistory className='text-lg' />
            Clear History
          </button>
        </div>

        <div className='flex flex-col justify-between gap-y-4'>
          <p className='text-gray-800 dark:text-gray-300 font-semibold leading-5 flex gap-x-2'>
            <IoIosHelpCircle className='w-8 text-2xl' />
            <span className='w-full'>
              Reset settings and clear all game data includes history, settings,
              character and theme mode
            </span>
          </p>

          <button
            className='bg-gray-700 font-medium text-white dark:text-gray-300 tracking-widest w-4/6 sm:max-w-[50%] py-2.5 flex items-center justify-center gap-x-2.5 rounded shadow-xl'
            onClick={handleResetGame}
          >
            <RxReset className='text-lg' />
            Reset Game
          </button>
        </div>
      </div>
    </Page>
  );
}
