import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useTheme() {
  const { setLocalStorage, getLocalStorage } = useLocalStorage();
  const initialState = getLocalStorage('theme') || 'light';
  const [theme, setTheme] = useState(initialState);

  useEffect(() => {
    setLocalStorage('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return { theme, setTheme };
}
