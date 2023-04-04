import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (user: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    return storedUser != null ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.log(error);
  }
};
