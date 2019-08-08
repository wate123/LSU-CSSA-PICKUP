/*
 *
 * LogRegister actions
 *
 */

import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT,
  LOGIN_SUBMIT_ERROR,
  REGISTER_SUBMIT,
  REGISTER_SUBMIT_SUCCESS,
  REGISTER_SUBMIT_ERROR,
  GET_NEW_ACCESS_TOKEN,
  RENEW_ACCESS_TOKEN,
  RENEW_ACCESS_TOKEN_FAIL,
  GET_USER_DATA_IN_STORAGE,
  LOGOUT,
  GET_USER_DATA_IN_STORAGE_FAIL,
  FORGOT_PASS,
  SUBMIT_FORGOT_PASS,
  SUBMIT_FORGOT_PASS_FAIL,
  SUBMIT_FORGOT_PASS_SUCCESS,
} from './constants';

export function logout(key) {
  return {
    type: LOGOUT,
    key,
  };
}

export function toggleLoginModal() {
  return {
    type: TOGGLE_LOGIN_MODAL,
  };
}

/**
 * Dispatched when the login submit button pressed.
 * @param {object} userCredentials the User userCredentials
 * @returns {object} An action object with type of LOGIN_SUBMIT passing the User userCredentials.
 */
export function onLoginSubmit(userCredentials) {
  return {
    type: LOGIN_SUBMIT,
    userCredentials,
  };
}

/**
 * Dispatched when the login submitted successfully.
 * @returns {object} An action object with type of LOGIN_SUBMIT_SUCCESS passing the callback from server.
 */
export function loginSubmittedSuccess(callback) {
  return {
    type: LOGIN_SUBMIT_SUCCESS,
    callback,
  };
}

/**
 * Dispatched when the login submit fails
 * @param {object} error The error
 * @returns {object} An action object with type of LOGIN_SUBMIT_ERROR passing the error.
 */
export function onLoginSubmitError(error) {
  return {
    type: LOGIN_SUBMIT_ERROR,
    error,
  };
}

export function toggleRegisterModal() {
  return {
    type: TOGGLE_REGISTER_MODAL,
  };
}

/**
 * Dispatched when the register submit button pressed.
 * @param {object} userCredentials the User userCredentials
 * @returns {object} An action object with type of REGISTER_SUBMIT passing the User userCredentials.
 */
export function onRegisterSubmit(userCredentials) {
  return {
    type: REGISTER_SUBMIT,
    userCredentials,
  };
}

/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function registerSubmittedSuccess(callback) {
  return {
    type: REGISTER_SUBMIT_SUCCESS,
    callback,
  };
}

/**
 * Dispatched when the register submit fails
 * @returns {object} An action object with type of REGISTER_SUBMIT_ERROR passing the error.
 */
export function onRegisterSubmitError() {
  return {
    type: REGISTER_SUBMIT_ERROR,
  };
}

/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function getNewAccessToken(callback) {
  return {
    type: GET_NEW_ACCESS_TOKEN,
    callback,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function renewAccessToken(callback) {
  return {
    type: RENEW_ACCESS_TOKEN,
    callback,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function renewAccessTokenFail() {
  return {
    type: RENEW_ACCESS_TOKEN_FAIL,
  };
}

/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function getUserData() {
  return {
    type: GET_USER_DATA_IN_STORAGE,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function getUserDataFail() {
  return {
    type: GET_USER_DATA_IN_STORAGE_FAIL,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function forgetPassword() {
  return {
    type: FORGOT_PASS,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function submitForgetPassword(email) {
  return {
    type: SUBMIT_FORGOT_PASS,
    email,
  };
}
/**
 * Dispatched when the register submitted successfully.
 * @returns {object} An action object with type of REGISTER_SUBMIT_SUCCESS passing the callback from server.
 */
export function submitForgetPasswordSuccess() {
  return {
    type: SUBMIT_FORGOT_PASS_SUCCESS,
  };
}
