import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  LOGIN_SUBMIT,
  GENERATE_ACCESS_TOKEN,
  REGISTER_SUBMIT,
  GET_USER_DATA_IN_STORAGE,
  RENEW_ACCESS_TOKEN_FAIL,
  LOGOUT,
} from './constants';
import { makeSelectLoginUserData } from './selectors';
import {
  loginSubmittedSuccess,
  onLoginSubmitError,
  registerSubmittedSuccess,
  onRegisterSubmitError,
  onLoginSubmit,
  saveAccessToken,
  generateAccessToken,
  invalidRefreshToken,
} from './actions';
import { API_ROOT } from '../../../config/api-config';

import request from '../../utils/request';
import Auth from '../../utils/Auth';

const requestRootURL = `${API_ROOT}`;
const options = formData => ({
  method: 'POST',
  body: formData,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
  // headers: new Headers({
  //   Authorization: `Basic ${formData}`,
  // }),
  credentials: 'omit',
});

export function* reloginNotification() {
  yield notification.error({ message: '请重新登录' });
}
export function* logoutNotification() {
  yield notification.success({ message: '客官下次再来(´థ౪థ）σ' });
}
// Individual exports for testing
export default function* logRegisterSaga() {
  // yield takeLatest(LOGIN_SUBMIT, loginDataSubmit);
  // yield takeLatest(REGISTER_SUBMIT, registerDataSubmit);
  // yield takeLatest(RENEW_ACCESS_TOKEN_FAIL, reloginNotification);
  yield takeLatest(LOGOUT, logoutNotification);
}
