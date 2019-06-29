import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import { GET_IMAGE } from './constants';
import { getImage, getImageError, getImageSuccess } from './actions';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';

const requestRootURL = `${API_ROOT}`;
const options = {
  method: 'POST',
  // headers: {
  //   'Content-type': 'application/x-www-form-urlencoded',
  // },
  // headers: new Headers({
  //   Authorization: `Basic ${formData}`,
  // }),
  credentials: 'omit',
};
export function* getImageFromServer() {
  const requestURL = `${requestRootURL}/image`;
  try {
    const response = yield call(request, requestURL, options);
    console.log(response);
    yield put(getImageSuccess(response));
  } catch (err) {
    yield put(getImageError(err));
  }
}
// Individual exports for testing
export default function* notFoundSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_IMAGE, getImageFromServer);
}
