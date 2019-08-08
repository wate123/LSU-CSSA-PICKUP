import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the logRegister state domain
 */

const selectLogRegisterDomain = state => state.logRegister || initialState;
/**
 * Other specific selectors
 */

/**
 * Select isLoginModelOpen data
 */
export const makeSelectLoginModel = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isLoginModelOpen,
  );

/**
 * Select isRegisterModelOpen data
 */
export const makeSelectRegisterModel = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isRegisterModelOpen,
  );

// /**
//  * Select login user data
//  */
// export const makeSelectLoginUserData = () =>
//   createSelector(
//     selectLogRegisterDomain,
//     substate => substate.userCredentials,
//   );
//
/**
 * Select login user callback data
 */
export const makeSelectSuccessLoginCallback = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.loginSuccessCallback,
  );
/**
 * Selector used to select isloggedin state
 */

export const makeSelectisLoggedIn = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isLoggedIn,
  );
/**
 * Selector used to select isloggedin state
 */

export const makeSelectIsRegisterSuccess = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isRegisterSuccess,
  );

/**
 * Selector used to select isVolunteer state
 */

export const makeSelectisVolunteer = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isVolunteer,
  );

/**
 * Selector used to select userInfo state
 */

export const makeSelectuserInfo = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.userInfo,
  );
/**
 * Selector used to select userInfo state
 */

export const makeSelectIsError = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isError,
  );
/**
 * Selector used to select userInfo state
 */

export const makeSelectIsLogout = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isLogout,
  );
/**
 * Selector used to select userInfo state
 */

export const makeSelectIsForget = () =>
  createSelector(
    selectLogRegisterDomain,
    substate => substate.isForget,
  );

// /**
//  * Select register user callback data
//  */
// export const makeSelectSuccessRegisterCallback = () =>
//   createSelector(
//     selectLogRegisterDomain,
//     substate => substate.registerSuccessCallback,
//   );
export { selectLogRegisterDomain };
