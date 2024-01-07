import useGeneralTimer from '../hooks/useGeneralTimer';

export default function Timer() {


  return (
    <div className='bg-gray-700 text-white text-sm px-2 py-1 flex items-center gap-x-1 rounded'>
      <span className='w-5 text-center'>
        {minutes < 10 ? '0' + minutes : minutes}
      </span>
      <span>:</span>
      <span className='w-5 text-center'>
        {seconds < 10 ? '0' + seconds : seconds}
      </span>
    </div>
  );
}
