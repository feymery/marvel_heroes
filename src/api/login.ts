import {storeUser} from './../storage/user';

export const login = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com') {
        const user = {
          name: 'John',
          surname: 'Doe',
          isAuthenticated: true,
          email: 'test@example.com',
        };
        storeUser(user);
        resolve(user as User);
      } else {
        const error = new Error('Invalid username or password');
        reject(error);
      }
    }, 1000);
  });
};
