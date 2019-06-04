import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the beVolunteer state domain
 */

const selectBeVolunteerDomain = state => state.beVolunteer || initialState;

/**
 * Other specific selectors
 */

/**
 * selector Volunteer
 */

export const makeSelectVolunteerConfirmList = () =>
  createSelector(
    selectBeVolunteerDomain,
    substate => substate.confirmList,
  );

/**
 * selector Volunteer data
 */

export const makeSelectVolunteerData = () =>
  createSelector(
    selectBeVolunteerDomain,
    substate => substate.VolunteerData,
  );
/**
 * selector Volunteer error
 */

export const makeSelectVolunteerError = () =>
  createSelector(
    selectBeVolunteerDomain,
    substate => substate.err,
  );

export { selectBeVolunteerDomain };
