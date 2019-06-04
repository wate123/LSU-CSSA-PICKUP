import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';
import {
  getRequesterDataSuccess,
  getRequesterDataError,
  acceptRequestSuccess,
  acceptRequestError,
} from './actions';
import Auth from '../../utils/Auth';
import { GET_REQUESTER_DATA, ACCEPT_REQUEST } from './constants';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import { logout } from '../LogRegister/actions';
import io from 'socket.io-client';
import { unknownServerError } from '../App/actions';

const socket = io(API_ROOT, { secure: true });
const requestRootURL = `${API_ROOT}`;
const options = () => ({
  method: 'POST',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${Auth.getToken('accessToken')}`,
  },
  credentials: 'omit',
});

export function* getRequesterData() {
  const requestURL = `${requestRootURL}/api/allRequester`;

  try {
    const response = yield call(request, requestURL, options());
    yield put(getRequesterDataSuccess(response));
  } catch (err) {
    if (err.response.status === 401) {
      yield put(getRequesterDataError(err));
      notification.error({ message: '已超时请重新登录' });
    } else {
      yield put(unknownServerError());
    }
    yield put(logout());
    yield put(push('/'));
  }
}
export function* acceptRequest(action) {
  const requestURL = `${requestRootURL}/api/acceptRequest`;
  const acceptOptions = id => ({
    method: 'POST',
    body: `id=${encodeURIComponent(id)}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${Auth.getToken('accessToken')}`,
    },
    credentials: 'omit',
  });

  try {
    const response = yield call(request, requestURL, acceptOptions(action.id));
    yield put(acceptRequestSuccess(response));
    notification.success({
      message:
        '请检查邮箱的收件箱和垃圾箱并等待至少10分钟, 如果还没有收到邮件, 请联系管理员',
      duration: 5,
    });
    socket.emit('volunteer accepted', true);
  } catch (err) {
    if (err.response.status === 401) {
      yield put(acceptRequestError(err));
      notification.error({ message: '已超时请重新登录' });
    } else {
      yield put(unknownServerError());
    }
    yield put(logout());
    yield put(push('/'));
  }
}

// Individual exports for testing
export default function* volunteerPortalSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_REQUESTER_DATA, getRequesterData);
  yield takeLatest(ACCEPT_REQUEST, acceptRequest);
}
