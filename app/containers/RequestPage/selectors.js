import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the requestPage state domain
 */

const selectRequestPageDomain = state => state.requestPage || initialState;

/**
 * Other specific selectors
 */

/**
 * selector request
 */

export const makeSelectRequestConfirmList = () =>
  createSelector(
    selectRequestPageDomain,
    substate => substate.confirmList,
  );

/**
 * selector request data
 */

export const makeSelectRequestData = () =>
  createSelector(
    selectRequestPageDomain,
    substate => substate.requestData,
  );
/**
 * selector request error
 */

export const makeSelectRequestError = () =>
  createSelector(
    selectRequestPageDomain,
    substate => substate.err,
  );

export { selectRequestPageDomain };
