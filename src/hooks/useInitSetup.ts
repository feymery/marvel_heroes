import {getUser} from './../storage/user';
import {useDispatch} from 'react-redux';
import {setUser} from '../store/user/actions';
import SplashScreen from 'react-native-splash-screen';

export const useInitSetup = () => {
  const dispatch = useDispatch();

  const checkAuthenticated = async () => {
    getUser()
      .then((value) => {
        if (value.isAuthenticated) {
          dispatch(setUser(value));
        }
        SplashScreen.hide();
      })
      .catch(() => {
        dispatch(
          setUser({isAuthenticated: false, name: '', surname: '', email: ''}),
        );
        SplashScreen.hide();
      });
  };
  return {
    checkAuthenticated,
  };
};
