import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notFound state domain
 */

const selectNotFoundDomain = state => state.notFound || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NotFound
 */

export const makeSelectNotFound = () =>
  createSelector(
    selectNotFoundDomain,
    substate => substate,
  );
export const makeSelectImage = () =>
  createSelector(
    selectNotFoundDomain,
    substate => substate.image,
  );
export const makeSelectIsLoading = () =>
  createSelector(
    selectNotFoundDomain,
    substate => substate.loading,
  );

export { selectNotFoundDomain };
