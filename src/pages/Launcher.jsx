import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

export default function Launcher() {
  const { theme } = useTheme();

  return (
    <motion.div
      className='max-w-3xl h-screen dark:bg-gray-800 relative overflow-x-hidden mx-auto'
      initial={{ opacity: 0, transform: 'translateY(-1rem)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
    >
      <img
        className='w-full h-full absolute object-cover'
        src={theme === 'dark' ? 'logo-light.png' : 'logo-dark.png'}
        alt='logo'
      />

      <div className='w-max max-w-60 text-center absolute bottom-36 inset-x-1/2 -translate-x-1/2'>
        <h1 className='text-gray-800 dark:text-gray-300'>
          <span className='text-6xl font-black'>Q.G</span>
          <span className='text-3xl font-bold'> Game</span>
        </h1>
        <p className='font-medium text-gray-800 dark:text-gray-400 leading-5 mt-2'>
          This is a simple Question and Answer Game as we call it
          <br /> <span className='font-semibold'>( Quiz Game )</span>
        </p>
        <Link to='/hint'>
          <button className='bg-gray-800 dark:bg-gray-700 text-lg font-medium text-white dark:text-gray-300 mt-6 tracking-widest px-12 py-2 rounded shadow-xl'>
            Start
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
