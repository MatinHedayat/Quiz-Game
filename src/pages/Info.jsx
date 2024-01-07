import Page from '../components/Page';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiStepsFill } from 'react-icons/pi';
import { FaHistory } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

export default function Info() {
  const { state } = useLocation();
  const infoItem = state.infoItem;
  const { categories, matchData, difficulties, endTime } = infoItem;

  const categoryList = categories
    .filter((item) => item.isSelected)
    .map((item) => item.title);

  const difficultyList = difficulties
    .filter((item) => item.isSelected)
    .map((item) => item.title);

  const correctAnswers = matchData?.filter(
    (question) =>
      question.selectedAnswer &&
      question.selectedAnswer === question.correctAnswer
  );

  const IncorrectAnswers = matchData?.filter(
    (question) =>
      question.selectedAnswer &&
      question.selectedAnswer !== '' &&
      question.selectedAnswer !== question.correctAnswer
  );

  const noAnswerQuestions = matchData?.filter(
    (question) => !question.selectedAnswer
  );

  const calculateCreationTime = (item, type) => {
    if (type === 'date') {
      return new Date(item.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      });
    } else {
      return new Date(item.creationTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
  };

  const list = [
    { title: 'Total Questions', value: matchData?.length },
    { title: 'Correct Answers', value: correctAnswers?.length },
    { title: 'Incorrect Answers', value: IncorrectAnswers?.length },
    { title: 'No Answer', value: noAnswerQuestions?.length },
    { title: 'Finished in', value: `${endTime.minutes}m ${endTime.seconds}s` },
  ];

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
      <Page title='information' footer={false}>
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

        <div className='text-gray-800 dark:text-gray-300 my-10'>
          <h3 className='text-xl font-semibold flex items-center gap-x-2 mb-2'>
            <FaHistory />
            Match History
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

          <div className='font-medium text-sm text-center flex flex-col gap-y-2'>
            <div className='w-max font-semibold flex items-center gap-x-2'>
              <PiStepsFill className='stroke-2' />
              Creation Time :
            </div>

            <div className='flex items-center gap-x-2'>
              <span className='bg-gray-600 text-white/80 px-2 py-1 tracking-widest rounded'>
                {calculateCreationTime(infoItem, 'time')}
              </span>

              <span className='bg-gray-600 text-white/80 px-2 py-1 tracking-widest rounded'>
                {calculateCreationTime(infoItem, 'date')}
              </span>
            </div>
          </div>
        </div>

        <h2 className='text-xl text-gray-800 dark:text-gray-300 font-bold mb-3'>
          Questions :
        </h2>

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
      </Page>
    </>
  );
}
