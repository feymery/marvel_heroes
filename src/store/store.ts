import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/reducer';
const store = configureStore({
  reducer: userReducer,
});

export default store;
