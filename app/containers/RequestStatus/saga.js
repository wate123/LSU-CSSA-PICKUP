import { call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import { push } from 'connected-react-router';
import Auth from '../../utils/Auth';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';
import {
  cancelRequestSuccess,
  passRequestStatusData,
  getVolunteerDetailSuccess,
  getVolunteerDetailError,
} from './actions';
import {
  CANCEL_REQUEST,
  GET_REQUEST_STATUS,
  GET_VOLUNTEER_DETAIL,
} from './constants';
import { logout } from '../LogRegister/actions';
import { unknownServerError } from '../App/actions';

const requestRootURL = `${API_ROOT}`;
const options = typeToken => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: `bearer ${Auth.getToken(typeToken)}`,
  },
  // headers: new Headers({
  //   Authorization: `Basic ${formData}`,
  // }),
  credentials: 'omit',
});

export function* cancelRequest() {
  const requestURL = `${requestRootURL}/api/cancelRequest`;
  try {
    const response = yield call(request, requestURL, options('accessToken'));
    yield put(cancelRequestSuccess(response));
    yield notification.success({ message: '已成功取消' });
    // socket.emit('pickup request', true);
  } catch (err) {
    if (err.response.status === 409) {
      notification.error({
        message: '无法完成, 已有志愿者接受了你的请求, 请直接联系该志愿者',
      });
    } else {
      if (err.response.status === 401) {
        notification.error({ message: '已超时请重新登录' });
      } else {
        yield put(unknownServerError());
      }
      yield put(logout());
      yield put(push('/'));
    }

    // yield put(cancelRequestError(err));
    // yield put(generateAccessToken());
  }
}
export function* RequestStatus() {
  const requestURL = `${requestRootURL}/api/requestStatus`;
  try {
    const response = yield call(request, requestURL, options('accessToken'));
    yield put(passRequestStatusData(response.status));
    // socket.emit('pickup request', true);
  } catch (err) {
    // yield put(getRequestStatusError(err));
    if (err.response.status === 401) {
      notification.error({ message: '已超时请重新登录' });

      // yield put(generateAccessToken());
      // this.response = yield call(request, requestURL, options('accessToken'));
      // yield put(passRequestStatusData(this.response));
      // yield put(getRequestStatus());
    } else {
      yield put(unknownServerError());
    }
    yield put(logout());
    yield put(push('/'));
  }
}

export function* getVolunteerInfo() {
  const requestURL = `${requestRootURL}/api/getVolunteer`;
  try {
    const response = yield call(request, requestURL, options('accessToken'));
    yield put(getVolunteerDetailSuccess(response));
    // socket.emit('pickup request', true);
  } catch (err) {
    if (err.response.status === 401) {
      notification.error({ message: '已超时请重新登录' });
      yield put(getVolunteerDetailError(err));
    } else {
      yield put(unknownServerError());
    }
    yield put(logout());
    yield put(push('/'));
  }
}
// Individual exports for testing
export default function* requestStatusSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(CANCEL_REQUEST, cancelRequest);
  yield takeLatest(GET_REQUEST_STATUS, RequestStatus);
  yield takeLatest(GET_VOLUNTEER_DETAIL, getVolunteerInfo);
}
