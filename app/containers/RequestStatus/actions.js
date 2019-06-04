/*
 *
 * RequestStatus actions
 *
 */

import {
  CANCEL_REQUEST,
  CANCEL_REQUEST_SUCCESS,
  CANCEL_REQUEST_ERROR,
  CHANGE_REQUEST_INFO,
  SHOW_DRAWER,
  GET_REQUEST_STATUS,
  PASS_REQUEST_STATUS_DATA,
  GET_REQUEST_STATUS_ERROR,
  GET_VOLUNTEER_DETAIL,
  GET_VOLUNTEER_DETAIL_SUCCESS,
  GET_VOLUNTEER_DETAIL_ERROR,
} from './constants';

export function changeRequestInfo() {
  return {
    type: CHANGE_REQUEST_INFO,
  };
}
export function getRequestStatus() {
  return {
    type: GET_REQUEST_STATUS,
  };
}
export function passRequestStatusData(status) {
  return {
    type: PASS_REQUEST_STATUS_DATA,
    status,
  };
}

export function getRequestStatusError(error) {
  return {
    type: GET_REQUEST_STATUS_ERROR,
    error,
  };
}
export function cancelRequest() {
  return {
    type: CANCEL_REQUEST,
  };
}
export function cancelRequestSuccess(successData) {
  return {
    type: CANCEL_REQUEST_SUCCESS,
    successData,
  };
}
export function cancelRequestError(err) {
  return {
    type: CANCEL_REQUEST_ERROR,
    err,
  };
}
export function getVolunteerDetail() {
  return {
    type: GET_VOLUNTEER_DETAIL,
  };
}
export function toggleDrawer() {
  return {
    type: GET_VOLUNTEER_DETAIL,
  };
}
export function getVolunteerDetailSuccess(volunteerDetail) {
  return {
    type: GET_VOLUNTEER_DETAIL_SUCCESS,
    volunteerDetail,
  };
}
export function getVolunteerDetailError() {
  return {
    type: GET_VOLUNTEER_DETAIL_ERROR,
  };
}
