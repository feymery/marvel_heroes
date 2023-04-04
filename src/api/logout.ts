import {storeUser} from './../storage/user';

export const logout = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        name: '',
        surname: '',
        isAuthenticated: false,
        email: '',
      };
      storeUser(user);
      resolve(user);
    }, 1000);
  });
};
