/*
 *
 * BeVolunteer reducer
 *
 */
import produce from 'immer';
import React from 'react';
import { notification, Icon } from 'antd';

import {
  SUBMIT_REQUEST,
  SUBMIT_VOLUNTEER_CONFIRMED,
  SUBMIT_VOLUNTEER_ERROR,
  SUBMIT_VOLUNTEER_SUCCESS,
} from './constants';
import Auth from '../../utils/Auth';
export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const beVolunteerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUBMIT_REQUEST:
        break;
      case SUBMIT_VOLUNTEER_CONFIRMED:
        draft.requestData = action.requestData;
        break;
      case SUBMIT_VOLUNTEER_SUCCESS:
        draft.successData = action.successData;
        Auth.authenticateUser(action.successData.token);
        notification.open({
          message: <Icon type="heart" />,
          description: action.successData.message,
        });
        break;
      case SUBMIT_VOLUNTEER_ERROR:
        if (action.status === 401) {
          notification.error({ message: '请重新登录' });
        }

        break;
    }
  });

export default beVolunteerReducer;
