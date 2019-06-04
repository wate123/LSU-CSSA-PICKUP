import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requestStatus state domain
 */

const selectRequestStatusDomain = state => state.requestStatus || initialState;

/**
 * Other specific selectors
 */

/**
 *  select isRequestExist state.
 */

export const makeSelectIsRequestExist = () =>
  createSelector(
    selectRequestStatusDomain,
    substate => substate.isRequestExist,
  );
/**
 *  select isRequestExist state.
 */

export const makeSelectRequestStatus = () =>
  createSelector(
    selectRequestStatusDomain,
    substate => substate.requestStatus,
  );
/**
 *  select isRequestExist state.
 */

export const makeSelectVolunteerInfo = () =>
  createSelector(
    selectRequestStatusDomain,
    substate => substate.volunteerInfo,
  );
/**
 *  select isRequestExist state.
 */

export const makeSelectIsDrawerVisible = () =>
  createSelector(
    selectRequestStatusDomain,
    substate => substate.isDrawerVisible,
  );
/**
 *  select isRequestExist state.
 */

export const makeSelectIsLoading = () =>
  createSelector(
    selectRequestStatusDomain,
    substate => substate.isLoading,
  );

export { selectRequestStatusDomain };
