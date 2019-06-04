/*
 *
 * VolunteerPortal actions
 *
 */

import {
  GET_REQUESTER_DATA,
  GET_REQUESTER_DATA_SUCCESS,
  GET_REQUESTER_DATA_ERROR,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_ERROR,
} from './constants';

export function getRequesterData() {
  return {
    type: GET_REQUESTER_DATA,
  };
}
export function getRequesterDataSuccess(data) {
  return {
    type: GET_REQUESTER_DATA_SUCCESS,
    data,
  };
}
export function getRequesterDataError(err) {
  return {
    type: GET_REQUESTER_DATA_ERROR,
    err,
  };
}
export function acceptRequest(id) {
  return {
    type: ACCEPT_REQUEST,
    id,
  };
}
export function acceptRequestSuccess(newAccessToken) {
  return {
    type: ACCEPT_REQUEST_SUCCESS,
    newAccessToken,
  };
}
export function acceptRequestError(err) {
  return {
    type: ACCEPT_REQUEST_ERROR,
    err,
  };
}
