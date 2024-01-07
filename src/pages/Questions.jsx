import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from '../hooks/useFetchData';
import { updateMatchData } from '../features/matchDataSlice';
import useGeneralTimer from '../hooks/useGeneralTimer';

export default function Questions() {
  const matchData = useSelector((state) => state.matchData);
  const { timer, backBtn } = useSelector((state) => state.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError } = useFetchData();
  const { minutes, seconds } = useGeneralTimer();

  const initialState = JSON.parse(localStorage.getItem('matchDataIndex')) || 0;
  const [matchDataIndex, setMatchDataIndex] = useState(initialState);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setAnswers(
      [
        matchData[matchDataIndex].correctAnswer,
        ...matchData[matchDataIndex].incorrectAnswers,
      ].sort()
    );

    localStorage.setItem('matchDataIndex', matchDataIndex);
  }, [matchData, matchDataIndex]);

  const handleNext = () => {
    if (matchDataIndex === matchData.length - 1) {
      navigate('/result');
      return;
    }

    setMatchDataIndex(matchDataIndex + 1);
  };

  return (
    <>
      <Page title='Questions' footer={false}>
        {!isLoading && !isError && (
          <>
            <div className='flex items-center justify-between mt-8 mb-6'>
              <div className='text-white/80 flex items-center gap-x-1.5'>
                <span className='bg-gray-700 w-8 text-sm text-center font-medium py-1 rounded'>
                  {matchDataIndex + 1}
                </span>

                <span className='text-gray-700 text-sm font-bold'>|</span>

                <span className='bg-gray-700 w-8 text-sm text-center font-medium py-1 rounded'>
                  {matchData.length}
                </span>

                <span className='text-gray-700 text-sm font-bold'>|</span>

                <p className='bg-gray-700 font-medium text-sm capitalize px-2 py-1 rounded'>
                  {matchData[matchDataIndex].difficulty}
                </p>
              </div>

              {timer && (
                <div className='bg-gray-700 text-white text-sm px-2 py-1 flex items-center gap-x-1 rounded'>
                  <span className='w-5 text-center'>
                    {minutes < 10 ? '0' + minutes : minutes}
                  </span>
                  <span>:</span>
                  <span className='w-5 text-center'>
                    {seconds < 10 ? '0' + seconds : seconds}
                  </span>
                </div>
              )}
            </div>

            <div className='min-h-40 mb-4'>
              <p className='text-gray-800 dark:text-gray-200 text-2xl/7 font-bold'>
                {matchData[matchDataIndex].question.text}
              </p>
            </div>

            <div className='pr-2 overflow-y-auto flex flex-col gap-y-2 max-h-[40%] overflow-auto'>
              {answers.map((item) => (
                <button
                  className={`font-semibold p-2 border-2 border-gray-700 transition-colors duration-75 rounded hover:bg-gray-700 hover:text-white ${
                    item === matchData[matchDataIndex].selectedAnswer
                      ? 'bg-gray-700 text-white'
                      : 'bg-transparent text-gray-800 dark:text-gray-300'
                  }`}
                  key={item}
                  onClick={() =>
                    dispatch(updateMatchData({ matchDataIndex, answer: item }))
                  }
                >
                  {item}
                </button>
              ))}
            </div>

            <div className='bg-cream dark:bg-gray-800 w-full absolute bottom-40 z-10 inset-x-0 px-6 flex items-center justify-between border-t border-gray-700 transition-colors'>
              {backBtn && matchDataIndex !== 0 && (
                <button
                  className='bg-gray-700 text-white w-32 h-12 absolute top-6 left-6 flex items-center justify-center font-semibold   rounded'
                  onClick={() => setMatchDataIndex(matchDataIndex - 1)}
                >
                  Back
                </button>
              )}

              <button
                className='bg-gray-700 text-white w-32 h-12 absolute top-6 right-6 flex items-center justify-center font-semibold   rounded'
                onClick={handleNext}
              >
                {matchDataIndex === matchData.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </>
        )}
      </Page>
    </>
  );
}
