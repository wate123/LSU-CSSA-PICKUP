import {
  RELOGIN_NOTIFICATION,
  UNKNOWN_SERVER_ERROR,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  DUPLICATE_ACCOUNT,
  LOGOUT,
  WRONG_PASSWORD,
} from './constants';

export function reloginNotification() {
  return {
    type: RELOGIN_NOTIFICATION,
  };
}

export function unknownServerError() {
  return {
    type: UNKNOWN_SERVER_ERROR,
  };
}

export function loginSuccessNotification() {
  return {
    type: LOGIN_SUCCESS,
  };
}
export function registerSuccessNotification() {
  return {
    type: REGISTER_SUCCESS,
  };
}
export function DuplicateAccountNotification() {
  return {
    type: DUPLICATE_ACCOUNT,
  };
}
export function wrongPasswordNotification() {
  return {
    type: WRONG_PASSWORD,
  };
}
export function logoutNotification() {
  return {
    type: LOGOUT,
  };
}
