import Page from '../components/Page';
import { useEffect, useState } from 'react';
import avatarList from '../data/avatarList';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { TbLogout2, TbLogin2 } from 'react-icons/tb';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineSaveAlt } from 'react-icons/md';
import { loginCharacter, logoutCharacter } from '../features/characterSlice';

export default function Character() {
  const character = useSelector((state) => state.character);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(character.avatar);
  const [username, setUsername] = useState(character.username);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
  }, [character]);

  const handleLogin = () => {
    if (!username) return;
    dispatch(loginCharacter({ username, avatar, isLogin: true }));
    navigate(-1);
  };

  const handleLogout = () => {
    dispatch(logoutCharacter());
    navigate(-1);
  };

  return (
    <Page title='Character' footer={false}>
      <div className='mb-8'>
        <h2 className='text-2xl text-gray-800 dark:text-gray-300 font-bold'>
          Create Your Character
        </h2>

        <div className='text-gray-700 dark:text-gray-400 flex items-center gap-x-2 mt-1 sm:mt-2'>
          <MdOutlineVerifiedUser className='text-3xl w-14 sm:text-4xl sm:w-max' />
          <p className='font-semibold leading-5'>
            To create a character, you must choose an avatar and username
          </p>
        </div>
      </div>

      <div className='flex flex-wrap gap-4'>
        {avatarList.map((char) => (
          <button
            className={`w-12 flex items-center justify-center overflow-hidden outline rounded-full shadow-lg sm:w-14 ${
              char === avatar
                ? 'outline-4 outline-blue-400'
                : 'outline-2 outline-gray-700'
            }`}
            key={char}
            onClick={() => setAvatar(char)}
          >
            <img src={char} alt='character' />
          </button>
        ))}
      </div>

      <input
        className='bg-gray-700/20 text-gray-600 dark:text-gray-400 placeholder-gray-700 w-full text-lg font-bold tracking-wider px-6 py-3 my-8 outline-none border-2 border-gray-600 rounded shadow-xl transition-all'
        type='text'
        id='username'
        value={username}
        placeholder='Enter something ...'
        onChange={(e) => setUsername(e.target.value)}
      />

      {character.isLogin ? (
        <div className='grid grid-cols-2 grid-rows-2 gap-2'>
          <button
            className='bg-gray-700 text-white/80 flex items-center justify-center gap-x-2 text-lg font-semibold tracking-wider py-3 rounded shadow-xl'
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack />
            Back
          </button>

          <button
            className='bg-gray-700 text-white/80 flex items-center justify-center gap-x-2 text-lg font-semibold tracking-wider py-3 rounded shadow-xl'
            onClick={handleLogin}
          >
            <MdOutlineSaveAlt className='text-2xl' />
            Save
          </button>

          <button
            className='bg-gray-700 text-white/80 flex items-center justify-center gap-x-2 col-span-2 text-lg font-semibold tracking-wider py-3 rounded shadow-xl'
            onClick={handleLogout}
          >
            <TbLogout2 className='text-2xl' />
            Logout
          </button>
        </div>
      ) : (
        <div className='flex items-center gap-x-2'>
          <button
            className='bg-gray-700 text-white/80 flex items-center justify-center gap-x-2 w-1/2 text-lg font-semibold tracking-wider py-3 rounded shadow-xl'
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack />
            Back
          </button>

          <button
            className='bg-gray-700 text-white/80 flex items-center justify-center gap-x-2 w-1/2 text-lg font-semibold tracking-wider py-3 rounded shadow-xl'
            onClick={handleLogin}
          >
            <TbLogin2 className='text-2xl' />
            Login
          </button>
        </div>
      )}
    </Page>
  );
}
