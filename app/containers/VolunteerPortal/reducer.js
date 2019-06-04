/*
 *
 * VolunteerPortal reducer
 *
 */
import produce from 'immer';
import { notification } from 'antd';
import {
  GET_REQUESTER_DATA,
  GET_REQUESTER_DATA_SUCCESS,
  GET_REQUESTER_DATA_ERROR,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_ERROR,
} from './constants';
import Auth from '../../utils/Auth';

export const initialState = {
  Loading: false,
  requesterData: false,
  isAccessTokenExpired: false,
};

/* eslint-disable default-case, no-param-reassign */
const volunteerPortalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_REQUESTER_DATA:
        draft.Loading = true;
        break;
      case GET_REQUESTER_DATA_SUCCESS:
        draft.requesterData = action.data.result;
        draft.Loading = false;
        break;
      case GET_REQUESTER_DATA_ERROR:
        // notification.error({
        //   message: '请重新登录',
        // });
        draft.Loading = true;
        draft.isAccessTokenExpired = true;
        break;
      case ACCEPT_REQUEST:
        draft.requesterData = state.requesterData.filter(
          val => val._id !== action.id,
        );
        break;
      case ACCEPT_REQUEST_SUCCESS:
        Auth.authenticateUser(action.newAccessToken);
        // notification.success({
        //   message:
        //     '请检查邮箱的收件箱和垃圾箱并等待至少10分钟, 如果还没有收到邮件, 请联系管理员',
        //   duration: 5,
        // });
        break;
      case ACCEPT_REQUEST_ERROR:
        draft.isAccessTokenExpired = true;
        // notification.error({
        //   message: '请重新登录',
        //   duration: 5,
        // });
        break;
    }
  });

export default volunteerPortalReducer;
