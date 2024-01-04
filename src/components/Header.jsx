import { HiMenuAlt2 } from 'react-icons/hi';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header({ title, setIsMenuOpen }) {
  const character = useSelector((state) => state.character);
  const navigate = useNavigate();

  return (
    <div className='bg-gray-700 text-white/80 h-14 px-6 mb-10 flex items-center justify-between rounded'>
      <button onClick={() => setIsMenuOpen(true)}>
        <HiMenuAlt2 className=' text-2xl' />
      </button>

      <div className='flex items-center gap-x-4'>
        <div className='font-medium flex items-center gap-4'>
          <span>{title}</span>
          <span>|</span>
        </div>

        <button
          className='w-7 h-7 flex overflow-hidden rounded-full'
          onClick={() => navigate('/character')}
        >
          {character.isLogin ? (
            <img className='w-full' src={character.avatar} alt='character' />
          ) : (
            <FaRegUserCircle className='w-full h-full p-0.5' />
          )}
        </button>
      </div>
    </div>
  );
}
