import Page from '../components/Page';
import useFetchData from '../hooks/useFetchData';
import numberList from '../data/numberList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { PiSelectionBackgroundBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeBackBtn,
  changeDifficulties,
  changeNumberOfQuestions,
  changeTimer,
} from '../features/settingSlice';

export default function Setting() {
  const { difficulties, numberOfQuestions, timer, backBtn } = useSelector(
    (state) => state.setting
  );

  const dispatch = useDispatch();
  const { fetchData, apiUrl } = useFetchData();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const loadingCondition = isLoading ? (
    <ThreeDots width={40} height={20} color='white' />
  ) : (
    'Start Game'
  );

  const handleStartGame = () => {
    fetchData(apiUrl);
    setIsLoading(true);

    setTimeout(() => {
      if (location.pathname === '/setting') {
        navigate('/questions');
      }
    }, 3000);
  };

  return (
    <>
      <Page
        title='Setting'
        backPage='/categories'
        nextText={loadingCondition}
        nextFunc={handleStartGame}
      >
        <div className='h-2/3 overflow-auto pr-2'>
          <p className='text-gray-800 dark:text-gray-200 capitalize text-lg font-bold flex gap-x-2 mb-5'>
            <PiSelectionBackgroundBold className='text-3xl' />
            you can select single or multiple Difficulties :
          </p>

          <div className='flex flex-col items-center gap-y-2 mb-8'>
            {difficulties.map((item) => (
              <button
                className={`font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                  item.isSelected
                    ? 'bg-slate-700 text-white w-full'
                    : 'bg-transparent text-gray-800 dark:text-gray-300 w-5/6'
                }`}
                key={item.title}
                onClick={() => dispatch(changeDifficulties(item))}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className='text-gray-800 gap-x-2 mb-8'>
            <p className='capitalize dark:text-gray-200 text-lg font-bold'>
              Number of Questions :
            </p>
            <p className='text-sm font-medium mt-2'>
              <span className='bg-gray-600 text-white px-2 py-1 mr-2 rounded'>
                Hint
              </span>
              <span className='dark:text-gray-300'>
                The number of questions you will be asked
              </span>
            </p>
          </div>

          <div className='flex items-center justify-center gap-2'>
            {numberList.map((item) => (
              <button
                className={`w-16 font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                  item === numberOfQuestions
                    ? 'bg-slate-700 text-white'
                    : 'bg-transparent text-gray-800 dark:text-gray-300'
                }`}
                key={item}
                onClick={() => dispatch(changeNumberOfQuestions(item))}
              >
                {item}
              </button>
            ))}
          </div>

          <div className='text-gray-800 dark:text-gray-200 gap-x-2 mt-6 mb-8'>
            <p className='capitalize text-lg font-bold'>Timer :</p>
            <p className='text-sm font-medium mt-2'>
              <span className='bg-gray-600 text-white px-2 py-1 mr-2 rounded'>
                Hint
              </span>
              <span className='dark:text-gray-300'>
                Timer for the entire Quiz running time
              </span>
            </p>
          </div>

          <div className='flex items-center justify-center gap-2'>
            <button
              className={`w-40 font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                !timer
                  ? 'bg-slate-700 text-white'
                  : 'bg-transparent text-gray-800 dark:text-gray-300'
              }`}
              onClick={() => dispatch(changeTimer(false))}
            >
              Off
            </button>

            <button
              className={`w-40 font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                timer
                  ? 'bg-slate-700 text-white'
                  : 'bg-transparent text-gray-800 dark:text-gray-300'
              }`}
              onClick={() => dispatch(changeTimer(true))}
            >
              On
            </button>
          </div>

          <div className='text-gray-800 dark:text-gray-200 gap-x-2 mt-6 mb-8'>
            <p className='capitalize text-lg font-bold'>Back Button :</p>
            <p className='text-sm font-medium flex items-center mt-2'>
              <span className='bg-gray-600 text-white px-2 py-1 mr-2 rounded'>
                Hint
              </span>
              <span className='leading-4'>
                Ability for user to go back to previous question
              </span>
            </p>
          </div>

          <div className='flex items-center justify-center gap-2'>
            <button
              className={`w-40 font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                !backBtn
                  ? 'bg-slate-700 text-white'
                  : 'bg-transparent text-gray-800 dark:text-gray-300'
              }`}
              onClick={() => dispatch(changeBackBtn(false))}
            >
              Off
            </button>

            <button
              className={`w-40 font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                backBtn
                  ? 'bg-slate-700 text-white'
                  : 'bg-transparent text-gray-800 dark:text-gray-300'
              }`}
              onClick={() => dispatch(changeBackBtn(true))}
            >
              On
            </button>
          </div>
        </div>
      </Page>
    </>
  );
}
