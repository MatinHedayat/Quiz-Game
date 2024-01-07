import { FiHome } from 'react-icons/fi';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoMdSettings } from 'react-icons/io';
import { FaHistory } from 'react-icons/fa';
import { GrStorage } from 'react-icons/gr';

export const menu = [
  { title: 'Home', icon: <FiHome />, path: '/' },
  { title: 'Hint', icon: <IoMdHelpCircleOutline />, path: '/hint' },
  { title: 'Categories', icon: <BiCategoryAlt />, path: '/categories' },
  { title: 'Setting', icon: <IoMdSettings />, path: '/setting' },
  { title: 'History', icon: <FaHistory />, path: '/history' },
  { title: 'Storage', icon: <GrStorage />, path: '/storage' },
];
