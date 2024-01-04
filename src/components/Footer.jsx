import { Link } from 'react-router-dom';

export default function Footer(props) {
  const { isFooter, backPage, nextText, nextPage, nextFunc } = props;
  isFooter = true;

  return (
    <>
      {isFooter && (
        <div className='bg-cream dark:bg-gray-800 w-full h-40 absolute z-10 bottom-0 inset-x-0 pt-6 px-6 flex items-center justify-between border-t border-gray-700 transition-colors'>
          <Link to={backPage}>
            <button className='bg-gray-700 text-white w-32 h-12 flex items-center justify-center font-semibold rounded'>
              Back
            </button>
          </Link>

          <Link to={nextPage}>
            <button
              className='bg-gray-700 text-white w-32 h-12 flex items-center justify-center font-semibold rounded'
              onClick={nextFunc}
            >
              {nextText || 'Next'}
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
