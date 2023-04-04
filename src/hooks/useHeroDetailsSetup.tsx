import {useState, useEffect} from 'react';
import {useCachedRequests} from '../components/prueba';
import {MarvelComicData} from '../types/data';

export const useHeroDetailsSetup = () => {
  const [state, actions] = useCachedRequests();

  const [currentComics, setCurrentComics] = useState<MarvelComicData[]>([]);
  useEffect(() => {
    if (state.url && state.data && state.data[state.url] && !state.isFetching) {
      setCurrentComics(
        (list) => [...list, ...state.data[state.url]] as MarvelComicData[],
      );
    }
  }, [state.data, state.isFetching, state.url]);
  return {
    state,
    actions,
    currentComics,
  };
};
