/*
 *
 * NavBar reducer
 *
 */
import produce from 'immer';
import { CHECK_ACCESS_TOKEN, UNKNOWN_SERVER_ERROR } from './constants';

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
      case UNKNOWN_SERVER_ERROR:
        draft.unknownError = true;
        break;
    }
  });

export default navBarReducer;
