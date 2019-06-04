/*
 *
 * NavBar reducer
 *
 */
import produce from 'immer';
import {
  CHECK_ACCESS_TOKEN,
  GET_NEW_ACCESS_TOKEN,
  RENEW_ACCESS_TOKEN,
  RENEW_ACCESS_TOKEN_FAIL,
  GET_USER_DATA_IN_STORAGE,
  UNKNOWN_SERVER_ERROR,
} from './constants';
import Auth from '../../utils/Auth';

export const initialState = {
  loading: true,
  unknownError: false,
};

/* eslint-disable default-case, no-param-reassign */
const navBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHECK_ACCESS_TOKEN:
        // draft.isLoggedIn = Auth.isUserAuthenticated();
        break;
      case GET_NEW_ACCESS_TOKEN:
        // Auth.authenticateUser(action.callback.accessToken);
        // // draft.isLoggedIn = true;
        // sessionStorage.setItem('name', action.callback.user.name);
        // sessionStorage.setItem('email', action.callback.user.email);
        break;
      case UNKNOWN_SERVER_ERROR:
        draft.unknownError = true;
        break;
    }
  });

export default navBarReducer;
