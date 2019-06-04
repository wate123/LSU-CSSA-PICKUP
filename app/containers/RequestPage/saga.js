import { call, put, takeLatest } from 'redux-saga/effects';
import React from 'react';
import { push } from 'connected-react-router';
import { notification, Icon } from 'antd';
import io from 'socket.io-client';

import Auth from '../../utils/Auth';
import { SUBMIT_REQUEST, SUBMIT_REQUEST_CONFIRMED } from './constants';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';

import {
  submitRequestError,
  submitRequestSuccessful,
  submitRequestAfterConfirm,
} from './actions';
import { generateAccessToken } from '../LogRegister/actions';
import { getRequesterData } from '../VolunteerPortal/actions';
import { unknownServerError } from '../App/actions';
const socket = io(API_ROOT, { secure: true });

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
  const requestURL = `${requestRootURL}/post/newRequest`;
  const requestFormData = `name=${encodeURIComponent(
    action.requestData.name,
  )}&sex=${encodeURIComponent(
    action.requestData.sex,
  )}&hometown=${encodeURIComponent(
    action.requestData.hometown,
  )}&school=${encodeURIComponent(
    action.requestData.school,
  )}&degree=${encodeURIComponent(
    action.requestData.degree,
  )}&dateTime=${encodeURIComponent(
    `${action.requestData.date} ${action.requestData.time}`,
  )}&airport=${encodeURIComponent(
    action.requestData.airport === 'other'
      ? action.requestData.otherAirport
      : action.requestData.airport,
  )}&luggage=${encodeURIComponent(
    action.requestData.luggage,
  )}&friends=${encodeURIComponent(
    action.requestData.friends,
  )}&sleep=${encodeURIComponent(
    action.requestData.sleep,
  )}&phone=${encodeURIComponent(
    action.requestData.phone !== '无'
      ? `+${action.requestData.prefix} ${action.requestData.phone}`
      : action.requestData.phone,
  )}&social=${encodeURIComponent(
    action.requestData.social,
  )}&toVolunteer=${encodeURIComponent(
    action.requestData.toVolunteer,
  )}&toCSSA=${encodeURIComponent(
    action.requestData.toCSSA,
  )}&joinmail=${encodeURIComponent(
    action.requestData.joinmail,
  )}&status=${encodeURIComponent(
    `接机申请已提交 ${new Date().toLocaleString()}|正在匹配志愿者...}`,
  )}&accepted=${encodeURIComponent(
    action.requestData.accepted,
  )}&isVolunteer=${encodeURIComponent(action.requestData.isVolunteer)}`;

  try {
    const response = yield call(request, requestURL, options(requestFormData));
    // yield put(submitRequestSuccessful(response));
    notification.open({
      message: <Icon type="heart" />,
      description: response.message,
    });
    socket.emit('pickup request', true);
    // yield put(getRequesterData());
    yield put(push('/requestStatus'));
    // socket.emit('pickup request', true);
  } catch (err) {
    if (err.response.status === 401) {
      yield put(submitRequestError(err));
      notification.error({ message: '已超时请重新登录' });
    } else {
      yield put(unknownServerError());
    }
  }
}
// Individual exports for testing
export default function* requestPageSaga() {
  // yield takeLatest(SUBMIT_REQUEST, toggleConfirm);
  yield takeLatest(SUBMIT_REQUEST_CONFIRMED, requestDataSubmit);
}
