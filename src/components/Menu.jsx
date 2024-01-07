import { useRef } from 'react';
import useTheme from '../hooks/useTheme';
import { Link, useNavigate } from 'react-router-dom';
import { menu } from '../data/menuItems.jsx';
import useOutsideFocus from '../hooks/useOutsideFocus';
import { MdOutlineLightMode } from 'react-icons/md';
import { MdNightlight } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { BiTimer } from 'react-icons/bi';
import { IoArrowBack } from 'react-icons/io5';
import { changeBackBtn, changeTimer } from '../features/settingSlice.js';

export default function Menu({ isOpen, handleCloseMenu }) {
  const menuCN = isOpen ? 'top-0 shadow-2xl' : `-top-[25rem] shadow-none`;
  const menuRef = useRef();
  useOutsideFocus(menuRef, handleCloseMenu);

  const { theme, setTheme } = useTheme();
  const { timer, backBtn } = useSelector((state) => state.setting);
  const character = useSelector((state) => state.character);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={`bg-gradient-to-b from-gray-800 from-30% to-gray-800/20 absolute z-20 inset-0 backdrop-blur-sm transition-all duration-500 ease-in-out sm:bg-none ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      ></div>

      <div
        className={`bg-gray-800 h-[25rem] px-6 py-8 absolute z-30 inset-x-0 flex flex-col justify-end gap-y-2 rounded-b transition-all duration-500 ease-in-out sm:inset-x-6 ${menuCN}`}
        ref={menuRef}
      >
        <div className='absolute top-8 inset-x-6 flex items-center justify-between'>
          <button
            className='bg-gray-600/50 font-medium text-white/50 left-6 pl-6 pr-2 py-2 flex items-center gap-x-5 rounded-full'
            onClick={() => {
              if (location.pathname !== '/questions') navigate('/character');
            }}
          >
            <p className='text-sm tracking-widest'>
              Hi{' '}
              <span className='capitalize'>
                {character.username ? character.username : 'User'}
              </span>
            </p>

            <div className='w-8 h-8 flex overflow-hidden rounded-full'>
              {character.username ? (
                <img
                  className='w-full'
                  src={character.avatar}
                  alt='character'
                />
              ) : (
                <FaRegUserCircle className='w-full h-full p-0.5' />
              )}
            </div>
          </button>

          <button
            className='bg-gray-600/50 p-2.5 rounded-full'
            onClick={handleCloseMenu}
          >
            <IoClose className='text-white/50' />
          </button>
        </div>

        {location.pathname !== '/questions' ? (
          <div className='grid grid-cols-2 gap-2'>
            {menu.map((item) => (
              <Link to={item.path} key={item.title}>
                <button className='bg-gray-900 w-full tracking-widest text-gray-400 font-medium py-2.5 flex items-center justify-center gap-x-2 rounded'>
                  {item.icon}
                  {item.title}
                </button>
              </Link>
            ))}
          </div>
        ) : (
          <div className='grid gap-y-2'>
            <button
              className='bg-gray-900 w-full tracking-widest text-gray-400 font-medium py-2 rounded'
              onClick={() => navigate('/result')}
            >
              Finish <span className='text-sm'>and Check Result</span>
            </button>

            <button
              className='bg-gray-900 w-full tracking-widest text-gray-400 font-medium py-2 rounded'
              onClick={() => navigate('/setting')}
            >
              Cancel <span className='text-sm'>and Go to Setting</span>
            </button>

            <div className='grid grid-cols-2 gap-x-2'>
              <button className='bg-gray-900 px-4 py-1.5 rounded'>
                <p
                  className={`w-full tracking-widest text-gray-400 font-medium py-1.5 flex items-center justify-center gap-x-2 rounded ${
                    timer ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => dispatch(changeTimer(!timer))}
                >
                  <BiTimer className='text-lg' />
                  Timer
                </p>
              </button>

              <button className='bg-gray-900 px-4 py-1.5 rounded'>
                <p
                  className={`w-full tracking-widest text-gray-400 font-medium py-1.5 flex items-center justify-center gap-x-2 rounded ${
                    backBtn ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => dispatch(changeBackBtn(!backBtn))}
                >
                  <IoArrowBack />
                  BackBtn
                </p>
              </button>
            </div>
          </div>
        )}

        <div className='bg-gray-900 px-4 py-2 flex items-center gap-x-2 rounded'>
          <button
            className={`text-gray-400 w-1/2 flex items-center gap-x-3 justify-center py-1.5 rounded ${
              theme === 'light' ? 'bg-gray-800' : ''
            }`}
            onClick={() => setTheme('light')}
          >
            <MdOutlineLightMode />
            Light Mode
          </button>

          <button
            className={`text-gray-400 w-1/2 flex items-center gap-x-3 justify-center py-1.5 rounded ${
              theme === 'dark' ? 'bg-gray-800' : ''
            }`}
            onClick={() => setTheme('dark')}
          >
            <MdNightlight />
            Dark Mode
          </button>
        </div>
      </div>
    </>
  );
}
