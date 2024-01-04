import { useEffect } from 'react';

export default function useLocalStorage() {
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  return { setLocalStorage, getLocalStorage };
}
