import { useLocation, useNavigate } from 'react-router-dom';
import { CgComment } from 'react-icons/cg';
import { motion } from 'framer-motion';
import useTheme from '../hooks/useTheme';
import MatchHistory from '../components/MatchHistory';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect } from 'react';
import { addHistory } from '../features/historySlice';

export default function Result() {
  const matchData = useSelector((state) => state.matchData);
  const dispatch = useDispatch();
  const { categories, difficulties } = useSelector((state) => state.setting);

  const { getLocalStorage } = useLocalStorage();
  const { minutes, seconds } = getLocalStorage('record');

  useEffect(() => {
    dispatch(
      addHistory({
        id: Date.now(),
        matchData,
        categories,
        difficulties,
        endTime: { minutes, seconds },
        creationTime: new Date().toISOString(),
      })
    );
  }, [matchData]);

  const navigate = useNavigate();
  useTheme();

  const correctAnswers = matchData.filter(
    (question) =>
      question.selectedAnswer &&
      question.selectedAnswer === question.correctAnswer
  );
  const IncorrectAnswers = matchData.filter(
    (question) =>
      question.selectedAnswer &&
      question.selectedAnswer !== '' &&
      question.selectedAnswer !== question.correctAnswer
  );
  const noAnswerQuestions = matchData.filter(
    (question) => !question.selectedAnswer
  );

  const finalSentences = [
    'Well Done! Perfect Score',
    'Good Job! You are doing well',
    'Not Bad! Not Bad! ... You can do better',
    'Better luck next time',
    "Don't Be Sorry ... Try Again",
  ];

  const getFinalSentence = () => {
    const ScorePercentage = (correctAnswers.length / matchData.length) * 100;

    if (ScorePercentage === 100) {
      return finalSentences[0];
    } else if (ScorePercentage >= 80) {
      return finalSentences[1];
    } else if (ScorePercentage >= 50) {
      return finalSentences[2];
    } else if (ScorePercentage >= 30) {
      return finalSentences[3];
    } else {
      return finalSentences[4];
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('matchDataIndex');
    navigate('/setting');
  };

  const handleFinish = () => {
    localStorage.removeItem('matchDataIndex');
    navigate('/history');
  };

  const list = [
    { title: 'Total Questions', value: matchData.length },
    { title: 'Correct Answers', value: correctAnswers.length },
    { title: 'Incorrect Answers', value: IncorrectAnswers.length },
    { title: 'No Answer', value: noAnswerQuestions.length },
    { title: 'Finished in', value: `${minutes || 0}m ${seconds || 0}s` },
  ];

  return (
    <>
      <div>
        <motion.div
          className='page'
          initial={{ opacity: 0, transform: 'translateY(-1rem)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
        >
          <div className='mt-12 flex flex-col items-center gap-y-2'>
            <p className='bg-gray-300 text-gray-800 text-3xl font-bold px-20 py-4 rounded shadow-xl'>
              Result
            </p>

            <div className='w-full max-w-md flex flex-col gap-y-4 px-4 mt-12'>
              {list.map((item) => (
                <p
                  className='text-lg dark:text-gray-200 font-semibold flex items-center justify-between'
                  key={item.title}
                >
                  {item.title}:
                  <span className='bg-gray-300 dark:bg-gray-700 dark:text-gray-300 w-24 text-center py-1 ml-2 rounded shadow-lg'>
                    {item.value}
                  </span>
                </p>
              ))}
            </div>

            <p className='text-lg font-bold text-gray-800 dark:text-gray-300 my-8 flex  justify-center gap-x-2 px-4'>
              <span>
                <CgComment className='text-3xl' />
              </span>
              <span>{getFinalSentence()}</span>
            </p>

            <div className='w-full flex gap-x-4'>
              <button
                className='bg-red-500 w-1/2 py-4 text-white font-medium tracking-[0.2rem] rounded shadow-xl'
                onClick={handleRestart}
              >
                Setting
              </button>

              <button
                className='bg-gray-700 dark:bg-gray-700 w-1/2 py-4 text-white dark:text-gray-300 font-medium tracking-[0.2rem] rounded shadow-xl'
                onClick={handleFinish}
              >
                History
              </button>
            </div>
          </div>

          <MatchHistory />
        </motion.div>
      </div>
    </>
  );
}
