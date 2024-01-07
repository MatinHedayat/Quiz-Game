import Page from '../components/Page';
import { BiCategoryAlt } from 'react-icons/bi';
import { PiStepsFill } from 'react-icons/pi';
import { MdOutlineGamepad } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { removeHistory } from '../features/historySlice';

export default function History() {
  const history = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateCreationTime = (item, type) => {
    if (type === 'date') {
      return new Date(item.creationTime).toLocaleDateString('en-US', {
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

  const handleRemoveHistory = (e, item) => {
    e.stopPropagation();
    dispatch(removeHistory(item));
  };

  const [infoItem, setInfoItem] = useState(null);

  const handleShowGameInfo = (infoItem) => {
    // setInfoItem(infoItem);
    navigate('/info', { state: { infoItem } });
  };

  return (
    <Page title='History' footer={false}>
      <div className='text-gray-800 dark:text-gray-300 mt-10'>
        <p className='capitalize flex items-center gap-x-2'>
          <MdOutlineGamepad className='w-20 text-4xl' />
          <span className='text-2xl font-bold'>
            Information About all games you played
          </span>
        </p>

        <p className='font-medium leading-5 mt-2'>
          You can click on any of the items you want and get complete
          information about that part of the game
        </p>
      </div>

      {!history.length ? (
        <div className='text-gray-800 dark:text-gray-400 text-sm font-medium mt-16 flex flex-col items-center'>
          <p>History list is empty ...</p>
          <p>Play game and see the history</p>
        </div>
      ) : (
        <div className='flex flex-col gap-y-3 gap-x-2 mt-8 cursor-pointer sm:flex-row sm:flex-wrap'>
          {history.map((item, index) => (
            <div
              className='bg-gray-700 text-gray-300 p-3 flex flex-col 
            gap-y-4 rounded sm:w-[48%]'
              key={item.id}
              onClick={() => handleShowGameInfo(item)}
            >
              <div className='font-medium text-xs text-center flex items-center justify-between'>
                <p className='bg-gray-600 w-8 py-1 rounded'>{index + 1}</p>
              </div>

              <div className='text-sm font-medium space-y-2'>
                <div className='flex flex-wrap items-center gap-2'>
                  <p className='w-[6.5rem] font-semibold  flex items-center gap-x-2'>
                    <BiCategoryAlt className='stroke-1' />
                    Categories :
                  </p>

                  {item.categories
                    .filter((item) => item.isSelected)
                    .map((item) => item.title)
                    .map((item) => (
                      <p
                        className='bg-gray-600 text-white/80 px-2 py-1 rounded'
                        key={item}
                      >
                        {item}
                      </p>
                    ))}
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                  <p className='w-[6.5rem] font-semibold flex items-center gap-x-2'>
                    <PiStepsFill className='stroke-1' />
                    Difficulties :
                  </p>

                  {item.difficulties
                    .filter((item) => item.isSelected)
                    .map((item) => item.title)
                    .map((item) => (
                      <p
                        className='bg-gray-600 text-white/80 px-2 py-1 rounded'
                        key={item}
                      >
                        {item}
                      </p>
                    ))}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <button
                  className='bg-gray-600 px-2 py-1 flex items-center justify-center rounded'
                  onClick={(e) => handleRemoveHistory(e, item)}
                >
                  <MdOutlineDeleteSweep className='text-xl' />
                </button>

                <p className='bg-gray-600 font-medium text-xs px-3 py-1  tracking-widest rounded'>
                  {calculateCreationTime(item, 'time')}
                  <span className='px-2'>|</span>
                  {calculateCreationTime(item, 'date')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}
