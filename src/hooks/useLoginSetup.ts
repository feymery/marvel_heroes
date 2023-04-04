import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../api/login';
import {isEmail} from '../utils/isEmail';
import {setUser} from '../store/user/actions';

export const useLoginSetup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const checkEmail = (value: string) => {
    setIsValidEmail(isEmail(email));
    setEmail(value.toLowerCase());
  };

  const handleSubmitLogin = () => {
    if (isValidEmail && !loading) {
      setLoading(true);
      login(email)
        .then((value: User) => {
          dispatch(setUser(value));
          setLoading(false);
        })
        .catch(() => {
          Alert.alert('Error logging in');
          setLoading(false);
        });
    }
  };
  return {
    email,
    loading,
    setLoading,
    setEmail,
    isValidEmail,
    setIsValidEmail,
    checkEmail,
    handleSubmitLogin,
  };
};
