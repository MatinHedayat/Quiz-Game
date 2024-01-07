import Page from '../components/Page';

export default function Hint() {
  return (
    <>
      <Page title='Hint' backPage='/' nextPage='/categories'>
        <div className='text-gray-800 dark:text-gray-200 max-h-[65%] pb-8 pr-4 overflow-auto'>
          <h3 className='text-2xl dark:text-gray-300 font-extrabold capitalize'>
            Welcome to the game
          </h3>

          <p className='font-semibold mt-3 mb-6'>
            <span className='bg-gray-600 text-white text-sm font-normal px-2 py-1 mr-2 rounded'>
              Guide
            </span>
            If this is the first time you are experiencing this game, please
            read the description below, otherwise you can <b>Skip</b> this page.
          </p>

          <div className='font-medium flex flex-col gap-y-6'>
            <div>
              <p className='text-lg dark:text-gray-300 font-bold'>
                Description
              </p>
              <p>
                This is a question and answer game that you can use and enjoy
                with different settings. These settings include determining the{' '}
                <b>Category</b>, <b>Difficulty Level</b> and <b>Number</b> of
                questions and more. You can have different experiences of the
                game with different settings.
              </p>
            </div>

            <div>
              <p className='text-lg dark:text-gray-300 font-bold'>
                On the settings page
              </p>
              <p>
                after setting the settings you can start the game by pressing the{' '}
                <b>Start Game</b> button. On the questions page, you can choose
                the answer to each question or leave the question unanswered and
                press the <b>Next</b> button to go to the next question. After
                completing the questions, you can see the result of your
                performance on the result page
              </p>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
