import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMatchData } from '../features/matchDataSlice';
import { useState } from 'react';

export default function useFetchData() {
  const dispatch = useDispatch();
  const { categories, difficulties, numberOfQuestions } = useSelector(
    (state) => state.setting
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const categoriesQuery =
    'categories=' +
    categories
      .filter((item) => item.isSelected)
      .map((item) => item.value)
      .join(',');

  const difficultiesQuery =
    'difficulties=' +
    difficulties
      .filter((item) => item.isSelected)
      .map((item) => item.value)
      .join(',');

  const query = `${categoriesQuery}&${difficultiesQuery}&limit=${numberOfQuestions}`;
  const apiUrl = `https://the-trivia-api.com/v2/questions?${query}`;

  const fetchData = async (url) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios(url);
      dispatch(setMatchData(response.data));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, apiUrl, isLoading, isError };
}
