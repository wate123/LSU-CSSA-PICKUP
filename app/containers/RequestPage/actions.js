/*
 *
 * RequestPage actions
 *
 */

import {
  SUBMIT_REQUEST,
  SUBMIT_REQUEST_CONFIRMED,
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_ERROR,
} from './constants';

export function submitRequest() {
  return {
    type: SUBMIT_REQUEST,
  };
}
export function submitRequestAfterConfirm(requestData) {
  return {
    type: SUBMIT_REQUEST_CONFIRMED,
    requestData,
  };
}
export function submitRequestSuccessful(successData) {
  return {
    type: SUBMIT_REQUEST_SUCCESS,
    successData,
  };
}

export function submitRequestError(err) {
  return {
    type: SUBMIT_REQUEST_ERROR,
    err,
  };
}
