import {
  takeLatest,
  call,
  put,
  putResolve,
  throttle,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { notification, message } from 'antd';
import { push } from 'connected-react-router';
import { CHECK_ACCESS_TOKEN, RENEW_ACCESS_TOKEN_FAIL } from './constants';
import {
  LOGIN_SUBMIT,
  GET_USER_DATA_IN_STORAGE,
  REGISTER_SUBMIT,
} from '../LogRegister/constants';
import Auth from '../../utils/Auth';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';

import {
  loginSubmittedSuccess,
  onLoginSubmitError,
  registerSubmittedSuccess,
  onRegisterSubmitError,
  onLoginSubmit,
  renewAccessToken,
  renewAccessTokenFail,
} from '../LogRegister/actions';
import {
  loginSuccessNotification,
  registerSuccessNotification,
  DuplicateAccountNotification,
  unknownServerError,
  wrongPasswordNotification,
  reloginNotification,
} from '../App/actions';

const requestRootURL = `${API_ROOT}`;
const options = typeToken => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: `bearer ${Auth.getToken(typeToken)}`,
  },
  credentials: 'omit',
});
const optionsWithBody = formData => ({
  method: 'POST',
  body: formData,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
  credentials: 'omit',
});

export function* loginDataSubmit(action) {
  const requestURL = `${requestRootURL}/auth/login`;
  const loginFormData = `email=${encodeURIComponent(
    action.userCredentials.email,
  )}&password=${encodeURIComponent(action.userCredentials.password)}`;

  try {
    const response = yield call(
      request,
      requestURL,
      optionsWithBody(loginFormData),
    );
    yield put(loginSubmittedSuccess(response));
    yield put(loginSuccessNotification());
  } catch (err) {
    if (err.response.status === 401) {
      yield notification.error({ message: '密码错误' });
    } else {
      yield put(unknownServerError());
    }
  }
}
export function* registerDataSubmit(action) {
  const requestURL = `${requestRootURL}/auth/signup`;
  const registerFormData = `email=${encodeURIComponent(
    action.userCredentials.email,
  )}&password=${encodeURIComponent(
    action.userCredentials.password,
  )}&isVolunteer=${encodeURIComponent(false)}`;

  try {
    const response = yield call(
      request,
      requestURL,
      optionsWithBody(registerFormData),
    );
    yield putResolve(registerSubmittedSuccess(response));
    yield put(registerSuccessNotification());
    yield put(onLoginSubmit(action.userCredentials));
  } catch (err) {
    if (err.response.status === 409) {
      yield notification.error({ message: '換個郵箱吧～這個被人用過了' });
    } else {
      yield put(unknownServerError());
    }
  }
}

export function* checkExpire(action) {
  const requestURL = `${requestRootURL}/token/checkExpire`;
  try {
    const response = yield call(request, requestURL, options('accessToken'));
    yield put(renewAccessToken(response));
    // socket.emit('pickup request', true);
  } catch (err) {
    const genRequestURL = `${requestRootURL}/token/genAccessToken`;
    try {
      const renewResponse = yield call(
        request,
        genRequestURL,
        options('refreshToken'),
      );
      yield put(renewAccessToken(renewResponse));
    } catch {
      yield put(renewAccessTokenFail());
      // yield put(reloginNotification());
      yield put(push('/'));
    }
  }
}

// export function* genNewAccessToken(action) {
//   const requestURL = `${requestRootURL}/token/genAccessToken`;
//   try {
//     const response = yield call(request, requestURL, options('refreshToken'));
//     yield put(renewAccessToken(response));
//     // socket.emit('pickup request', true);
//   } catch (err) {
//     yield put(renewAccessTokenFail());
//     yield put(reloginNotification());
//     // yield call(genNewAccessToken());
//   }
// }
// const sagas = [checkExpire, genNewAccessToken];
// Individual exports for testing
export default function* navBarSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CHECK_ACCESS_TOKEN, checkExpire);
  // yield take(CHECK_ACCESS_TOKEN);
  // yield call(CHECK_ACCESS_TOKEN);
  // for (let saga of sagas) {
  //   yield call(saga()); /* saga: fetchUserSaga || fetchStyleSaga */
  // }
  yield takeLatest(LOGIN_SUBMIT, loginDataSubmit);
  yield takeLatest(REGISTER_SUBMIT, registerDataSubmit);
  // yield takeLatest(RENEW_ACCESS_TOKEN_FAIL, genNewAccessToken);
}
