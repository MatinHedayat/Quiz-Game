import { useState } from 'react';
import { GoInfo } from 'react-icons/go';
import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiStepsFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';

export default function MatchHistory() {
  const matchData = useSelector((state) => state.matchData);
  const { categories, difficulties } = useSelector((state) => state.setting);

  const [infoOpen, setInfoOpen] = useState(false);

  const categoryList = categories
    .filter((item) => item.isSelected)
    .map((item) => item.title);

  const difficultyList = difficulties
    .filter((item) => item.isSelected)
    .map((item) => item.title);

  function handleUserAction(item) {
    if (item.selectedAnswer === item.correctAnswer) {
      return 'Correct Answer';
    } else if (!item.selectedAnswer) {
      return 'No Answer';
    } else {
      return 'Incorrect Answer';
    }
  }

  return (
    <>
      {!infoOpen && (
        <button
          className='text-gray-700 dark:text-gray-300 font-semibold flex items-center gap-x-1.5 mt-6'
          onClick={() => setInfoOpen(true)}
        >
          <GoInfo className='stroke-1' />
          See more info
        </button>
      )}

      {infoOpen && (
        <motion.div
          className={`flex flex-col gap-y-6 mt-10`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, type: 'tween' }}
        >
          <div className='text-gray-800 dark:text-gray-300'>
            <h3 className='text-xl font-semibold flex items-center gap-x-2 mb-2'>
              <FaHistory />
              Match History
              <button
                className='text-gray-600 dark:text-gray-400 font-medium text-sm'
                onClick={() => setInfoOpen(false)}
              >
                ( Close )
              </button>
            </h3>

            <div className='font-semibold flex flex-col gap-y-2'>
              <div className='flex items-center gap-x-2'>
                <div className='bg-gray-700 w-6 h-6 rounded'></div>
                <span>Your Answer</span>
              </div>

              <div className='flex items-center gap-x-2'>
                <div className='bg-green-500/90 w-6 h-6 rounded'></div>
                <span>Correct Answer</span>
              </div>
            </div>

            <div className='text-sm font-medium flex flex-col gap-y-2 mt-4'>
              <div className='w-max font-semibold flex items-center gap-x-2'>
                <BiCategoryAlt className='stroke-1' />
                Categories :
              </div>

              <div className='flex flex-1 flex-wrap items-center gap-2'>
                {categoryList.map((item) => (
                  <p
                    className='bg-gray-600 text-white/80 px-2 py-1 rounded'
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className='text-sm font-medium flex flex-col gap-y-2 mt-4 mb-4'>
              <div className='w-max font-semibold flex items-center gap-x-2'>
                <PiStepsFill className='stroke-2' />
                Difficulties :
              </div>

              <div className='flex flex-1 flex-wrap items-center gap-2'>
                {difficultyList.map((item) => (
                  <p
                    className='bg-gray-600 text-white/80 px-2 py-1 rounded'
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-y-6 gap-x-2 sm:flex-row sm:flex-wrap'>
            {matchData.map((item, index) => (
              <div
                className='p-3 flex flex-col gap-y-6 border-2 border-gray-600 rounded shadow-xl sm:w-[48%]'
                key={item.id}
              >
                <div className='flex items-center justify-between'>
                  <p className='bg-gray-700 text-white/80 w-12 text-sm text-center font-medium py-1 rounded'>
                    {index + 1}
                  </p>

                  <p className='bg-gray-700 text-white/80 w-40 text-sm text-center font-medium py-1 rounded'>
                    {handleUserAction(item)}
                  </p>
                </div>

                <p className='text-gray-800 dark:text-gray-200 text-xl font-bold'>
                  {item.question.text}
                </p>

                <div className='flex flex-col text-gray-800 dark:text-gray-300 text-center gap-y-2'>
                  <p className='bg-green-500/90 dark:text-gray-800 font-semibold p-2 border-2 border-green-500/90 rounded transition-colors duration-75'>
                    {item.correctAnswer}
                  </p>

                  {item.incorrectAnswers.map((incAnswer) => (
                    <p
                      className={`font-semibold p-2 border-2 border-gray-700 transition-colors duration-75 rounded ${
                        item.selectedAnswer === incAnswer
                          ? 'bg-gray-700 text-white/80'
                          : ''
                      }`}
                      key={incAnswer}
                    >
                      {incAnswer}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
