/*
 *
 * NavBar actions
 *
 */

import {
  CHECK_ACCESS_TOKEN,
  UNKNOWN_SERVER_ERROR,
  RENEW_ACCESS_TOKEN,
  RENEW_ACCESS_TOKEN_FAIL,
} from './constants';

/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function checkAccessToken() {
  return {
    type: CHECK_ACCESS_TOKEN,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function unknownServerError() {
  return {
    type: UNKNOWN_SERVER_ERROR,
  };
}
