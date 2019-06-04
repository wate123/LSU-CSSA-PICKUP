import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the volunteerPortal state domain
 */

const selectVolunteerPortalDomain = state =>
  state.volunteerPortal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VolunteerPortal
 */

export const makeSelectLoading = () =>
  createSelector(
    selectVolunteerPortalDomain,
    substate => substate.Loading,
  );

/**
 * Default selector used by VolunteerPortal
 */

export const makeSelectIsAccessTokenExpired = () =>
  createSelector(
    selectVolunteerPortalDomain,
    substate => substate.isAccessTokenExpired,
  );
/**
 * Default selector used by VolunteerPortal
 */

export const makeSelectRequesterData = () =>
  createSelector(
    selectVolunteerPortalDomain,
    substate => substate.requesterData,
  );

export { selectVolunteerPortalDomain };
