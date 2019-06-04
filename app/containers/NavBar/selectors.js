import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navBar state domain
 */

const selectNavBarDomain = state => state.navBar || initialState;
const selectLocation = state => state.router.location;

export const makeSelectLocation = () =>
  createSelector(
    selectLocation,
    substate => substate,
  );
/**
 * Selector used to select isloggedin state
 */

export const makeSelectisLoggedIn = () =>
  createSelector(
    selectNavBarDomain,
    substate => substate.isLoggedIn,
  );
/**
 * Selector used to select isloggedin state
 */

export const makeSelectIsServerError = () =>
  createSelector(
    selectNavBarDomain,
    substate => substate.unknownError,
  );

/**
 * Selector used to select isVolunteer state
 */

export const makeSelectisVolunteer = () =>
  createSelector(
    selectNavBarDomain,
    substate => substate.isVolunteer,
  );

/**
 * Selector used to select isVolunteer state
 */

export const makeSelectuserInfo = () =>
  createSelector(
    selectNavBarDomain,
    substate => substate.userInfo,
  );
/**
 * Selector used to select loading state
 */

export const makeSelectLoading = () =>
  createSelector(
    selectNavBarDomain,
    substate => substate.loading,
  );
export { selectNavBarDomain, selectLocation };
