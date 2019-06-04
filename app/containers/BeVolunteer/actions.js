/*
 *
 * Volunteer actions
 *
 */

import {
  SUBMIT_REQUEST,
  SUBMIT_VOLUNTEER_CONFIRMED,
  SUBMIT_VOLUNTEER_SUCCESS,
  SUBMIT_VOLUNTEER_ERROR,
} from './constants';

export function submitRequest() {
  return {
    type: SUBMIT_REQUEST,
  };
}
export function submitVolunteerAfterConfirm(requestData) {
  return {
    type: SUBMIT_VOLUNTEER_CONFIRMED,
    requestData,
  };
}
export function submitVolunteerSuccessful(successData) {
  return {
    type: SUBMIT_VOLUNTEER_SUCCESS,
    successData,
  };
}

export function submitVolunteerError(err) {
  return {
    type: SUBMIT_VOLUNTEER_ERROR,
    err,
  };
}
