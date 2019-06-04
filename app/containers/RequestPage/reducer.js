/*
 *
 * RequestPage reducer
 *
 */
import React from 'react';
import produce from 'immer';
import { notification, Icon } from 'antd';
import {
  SUBMIT_REQUEST,
  SUBMIT_REQUEST_CONFIRMED,
  SUBMIT_REQUEST_ERROR,
  SUBMIT_REQUEST_SUCCESS,
} from './constants';
import Auth from '../../utils/Auth';

export const initialState = {
  confirmList: false,
  requestData: false,
  err: false,
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const requestPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUBMIT_REQUEST:
        break;
      case SUBMIT_REQUEST_CONFIRMED:
        draft.requestData = action.requestData;
        break;
      case SUBMIT_REQUEST_SUCCESS:
        draft.successData = action.successData;
        Auth.authenticateUser(action.successData.token);

        break;
      case SUBMIT_REQUEST_ERROR:
        // if (action.status === 401) {
        //   notification.error({ message: '请重新登录' });
        // }

        break;
    }
  });

export default requestPageReducer;
