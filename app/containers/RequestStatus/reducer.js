/*
 *
 * RequestStatus reducer
 *
 */
import produce from 'immer';
import {
  CANCEL_REQUEST_SUCCESS,
  CANCEL_REQUEST_ERROR,
  PASS_REQUEST_STATUS_DATA,
  GET_VOLUNTEER_DETAIL_SUCCESS,
  GET_VOLUNTEER_DETAIL_ERROR,
  GET_VOLUNTEER_DETAIL,
  TOGGLE_DRAWER,
} from './constants';

export const initialState = {
  isRequestExist: false,
  requestStatus: false,
  isDrawerVisible: false,
  volunteerInfo: false,
  loading: true,
};

/* eslint-disable default-case, no-param-reassign */
const requestStatusReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CANCEL_REQUEST_SUCCESS:
        // Auth.authenticateUser(action.message);
        draft.isRequestExist = false;
        break;
      case CANCEL_REQUEST_ERROR:
        // if (action.message === 'fail') {
        //   notification.error({
        //     message: '无法完成, 已有志愿者接受了你的请求, 请直接联系该志愿者',
        //   });
        // } else {
        //   notification.error({
        //     message: '请重新登录',
        //   });
        // }
        break;
      case PASS_REQUEST_STATUS_DATA:
        draft.requestStatus = action.status;
        break;
      case GET_VOLUNTEER_DETAIL:
        // draft.isDrawerVisible = true;
        break;
      case TOGGLE_DRAWER:
        // draft.isDrawerVisible = true;
        break;
      case GET_VOLUNTEER_DETAIL_SUCCESS:
        draft.loading = false;
        draft.isDrawerVisible = !state.isDrawerVisible;
        draft.volunteerInfo = action.volunteerDetail.result;
        break;
      case GET_VOLUNTEER_DETAIL_ERROR:
        draft.loading = true;
        draft.isDrawerVisible = false;
        break;
    }
  });

export default requestStatusReducer;
