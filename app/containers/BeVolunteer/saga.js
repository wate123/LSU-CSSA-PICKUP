import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Auth from '../../utils/Auth';
import {
  SUBMIT_REQUEST,
  SUBMIT_REQUEST_CONFIRMED,
  SUBMIT_VOLUNTEER_CONFIRMED,
} from './constants';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';
import { submitVolunteerError, submitVolunteerSuccessful } from './actions';
import { generateAccessToken } from '../LogRegister/actions';
const requestRootURL = `${API_ROOT}`;
const options = formData => ({
  method: 'POST',
  body: formData,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    Authorization: `bearer ${Auth.getToken('accessToken')}`,
  },
  // headers: new Headers({
  //   Authorization: `Basic ${formData}`,
  // }),
  credentials: 'omit',
});

export function* requestDataSubmit(action) {
  const requestURL = `${requestRootURL}/post/volunteer`;

  const requestFormData = `name=${encodeURIComponent(
    action.requestData.name,
  )}&sex=${encodeURIComponent(
    action.requestData.sex,
  )}&major=${encodeURIComponent(
    action.requestData.major,
  )}&school=${encodeURIComponent(
    action.requestData.school,
  )}&degree=${encodeURIComponent(
    action.requestData.degree,
  )}&car=${encodeURIComponent(
    action.requestData.car,
  )}&contact=${encodeURIComponent(
    action.requestData.contact,
  )}&toCSSA=${encodeURIComponent(
    action.requestData.toCSSA !== '无' ? action.requestData.toCSSA : '无',
  )}&joinmail=${encodeURIComponent(
    action.requestData.joinmail,
  )}&accepted=${encodeURIComponent(
    action.requestData.accepted,
  )}&isVolunteer=${encodeURIComponent(action.requestData.isVolunteer)}`;
  try {
    const response = yield call(request, requestURL, options(requestFormData));
    yield put(submitVolunteerSuccessful(response));
    yield put(push('/volunteer'));
    // socket.emit('pickup request', true);
  } catch (err) {
    if (err.status === 401) {
      try {
        yield put(generateAccessToken());
        yield call(request, requestURL, options(requestFormData));
      } catch (errs) {
        yield put(submitVolunteerError(errs));
      }
    }
    yield put(submitVolunteerError(err));
  }
}
// Individual exports for testing
export default function* beVolunteerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SUBMIT_VOLUNTEER_CONFIRMED, requestDataSubmit);
}
