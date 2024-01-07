import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/Page';
import { PiSelectionBackgroundBold } from 'react-icons/pi';
import { changeCategories } from '../features/settingSlice';

export default function Categories() {
  const { categories } = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  return (
    <>
      <Page title='Categories' backPage='/hint' nextPage='/setting'>
        <p className='text-gray-800 dark:text-gray-200 capitalize text-lg font-bold flex gap-x-2 mb-4'>
          <PiSelectionBackgroundBold className='text-3xl' />
          you can select single or multiple categories :
        </p>

        <div className='flex flex-col items-center gap-y-2 pr-2 max-h-[55%] overflow-auto'>
          {categories.map((item) => (
            <button
              className={`font-semibold px-4 py-2 border-2 border-gray-700 rounded transition-all ${
                item.isSelected
                  ? 'bg-slate-700 text-white w-full'
                  : 'bg-transparent text-gray-800 dark:text-gray-300 w-5/6'
              }`}
              key={item.title}
              onClick={() => dispatch(changeCategories(item))}
            >
              {item.title}
            </button>
          ))}
        </div>
      </Page>
    </>
  );
}
