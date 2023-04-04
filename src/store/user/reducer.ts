import {PayloadAction} from '@reduxjs/toolkit';
import {SET_USER} from './actions';

const initialState = {
  name: '',
  surname: '',
  email: '',
  isAuthenticated: false,
};

function userReducer(state = initialState, action: PayloadAction<User>) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

export type UserState = ReturnType<typeof userReducer>;

export default userReducer;
