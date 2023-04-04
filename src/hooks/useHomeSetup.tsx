import {useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../api/logout';
import {useCachedRequests} from '../components/prueba';
import {setUser} from '../store/user/actions';
import {UserState} from '../store/user/reducer';
import {MarvelHeroData} from '../types/data';
import {useNavigation} from './useNavigation';

export const useHomeSetup = () => {
  const navigation = useNavigation();

  const [state, actions] = useCachedRequests();
  const [loading, setLoading] = useState(false);
  const [currentList, setCurrentList] = useState<MarvelHeroData[]>([]);
  const isFocused = useIsFocused();
  const user = useSelector((userState: UserState) => userState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      state.url &&
      state.data &&
      state.data[state.url] &&
      !state.isFetching &&
      isFocused
    ) {
      setCurrentList(
        (list) => [...list, ...state.data[state.url]] as MarvelHeroData[],
      );
    }
  }, [isFocused, state, state.data, state.isFetching, state.url]);

  const submitLogout = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    logout().then((value: User) => {
      dispatch(setUser(value));
      setLoading(false);
    });
  };

  const goToDetails = (item: MarvelHeroData) => {
    navigation.navigate('heroDetails', {hero: item});
  };

  return {
    state,
    actions,
    loading,
    submitLogout,
    currentList,
    user,
    goToDetails,
  };
};
