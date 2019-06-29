/*
 *
 * LogRegister reducer
 *
 */
import produce from 'immer';
import { message, notification } from 'antd';
import {
  TOGGLE_LOGIN_MODAL,
  TOGGLE_REGISTER_MODAL,
  LOGIN_SUBMIT,
  LOGIN_SUBMIT_SUCCESS,
  REGISTER_SUBMIT,
  REGISTER_SUBMIT_SUCCESS,
  REGISTER_SUBMIT_ERROR,
  LOGIN_SUBMIT_ERROR,
  GET_USER_DATA_IN_STORAGE,
  LOGOUT,
  INVALID_REFRESH_TOKEN,
  RENEW_ACCESS_TOKEN,
  RENEW_ACCESS_TOKEN_FAIL,
} from './constants';
import Auth from '../../utils/Auth';

export const initialState = {
  isLoginModelOpen: false,
  isRegisterModelOpen: false,
  loading: false,
  registerSuccessCallback: false,
  error: false,
  // registerErrorCallback: {
  //   isSuccess: null,
  //   message: null,
  // },
  isLoggedIn: false,
  isRegisterSuccess: false,
  loginSuccessCallback: false,
  userInfo: false,
  isError: false,
};

/* eslint-disable default-case, no-param-reassign */
const logRegisterReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGOUT:
        sessionStorage.clear();
        draft.isLoginModelOpen = false;
        draft.isRegisterModelOpen = false;
        draft.loading = false;
        draft.registerSuccessCallback = false;
        draft.error = false;
        draft.isLoggedIn = false;
        draft.isRegisterSuccess = false;
        draft.isVolunteer = false;
        draft.loginSuccessCallback = false;
        draft.userInfo = false;
        draft.isError = false;
        break;
      case TOGGLE_LOGIN_MODAL:
        draft.isLoginModelOpen = !state.isLoginModelOpen;
        draft.isRegisterModelOpen = false;
        break;
      case TOGGLE_REGISTER_MODAL:
        draft.isRegisterModelOpen = !state.isRegisterModelOpen;
        draft.isLoginModelOpen = false;
        break;
      case LOGIN_SUBMIT:
        draft.userCredentials = {
          email: action.userCredentials.email,
          password: action.userCredentials.password,
        };
        break;
      case LOGIN_SUBMIT_SUCCESS:
        draft.isLoginModelOpen = !state.isLoginModelOpen;
        draft.isLoggedIn = true;
        draft.isLogout = false;
        draft.userInfo = action.callback.user;
        sessionStorage.setItem('email', action.callback.user.email);
        Auth.saveRefreshToken(action.callback.refreshToken);
        Auth.authenticateUser(action.callback.accessToken);
        sessionStorage.setItem('name', action.callback.user.name);
        sessionStorage.setItem('isVolunteer', action.callback.user.isVolunteer);
        // const hrs = new Date().getHours();
        // let greet = '你好,小彩蛋';
        // if (hrs < 12) greet = '早上好!';
        // else if (hrs >= 12 && hrs <= 17) greet = '下午好!';
        // else if (hrs >= 17 && hrs <= 24) greet = '晚上好!';
        // notification.success({
        //   message: `${greet} ${
        //     action.callback.user.name
        //       ? action.callback.user.name
        //       : action.callback.user.email
        //   }`,
        //   // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        // });
        break;
      case LOGIN_SUBMIT_ERROR:
        draft.isError = action.error.response;
        draft.userInfo = false;
        draft.isLoggedIn = false;
        // try {
        //   if (action.error.response.status === 409) {
        //     message.error('換個郵箱吧～這個被人用過了', 5);
        //   } else if (action.error.response.status === 401) {
        //     message.error('賬號密碼錯誤', 5);
        //   } else {
        //     message.error('無法完成登錄', 5);
        //   }
        // } catch {
        //   notification.error({ message: '服务器挂了...' });
        // }
        break;
      case REGISTER_SUBMIT:
        draft.userCredentials = {
          email: action.userCredentials.email.toLowerCase(),
          password: action.userCredentials.password,
          isVolunteer: action.userCredentials.isVolunteer,
        };
        break;
      case REGISTER_SUBMIT_SUCCESS:
        draft.loading = !state.loading;
        draft.isRegisterModelOpen = !state.isRegisterModelOpen;
        draft.isRegisterSuccess = true;
        // notification.success({
        //   message: '欢迎使用CSSA接机系统',
        //   description: '请登录并尽快完善你的信息',
        //   // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        // });
        break;
      case REGISTER_SUBMIT_ERROR:
        draft.isRegisterSuccess = false;
        try {
          if (action.error.response.status === 409) {
            message.error('換個郵箱吧～這個被人用過了', 5);
          }
          if (action.error.response.status === 400) {
            message.error('註冊失敗', 5);
          }
        } catch {
          notification.error({ message: '服务器挂了...' });
        }
        break;
      case INVALID_REFRESH_TOKEN:
        draft.isLoggedIn = false;
        // notification.error({ message: '请重新登录' });
        break;
      case GET_USER_DATA_IN_STORAGE:
        if (sessionStorage.getItem('name') || sessionStorage.getItem('email')) {
          draft.userInfo = {
            name: sessionStorage.getItem('name'),
            email: sessionStorage.getItem('email'),
            isVolunteer: sessionStorage.getItem('isVolunteer') == 'true',
          };
          draft.isLoggedIn = true;
        }
        break;
      case RENEW_ACCESS_TOKEN:
        Auth.authenticateUser(action.callback.accessToken);
        sessionStorage.setItem('name', action.callback.user.name);
        sessionStorage.setItem('email', action.callback.user.email);
        sessionStorage.setItem('isVolunteer', action.callback.user.isVolunteer);
        draft.isLoggedIn = true;
        draft.userInfo = action.callback.user;
        draft.loading = false;
        break;
      case RENEW_ACCESS_TOKEN_FAIL:
        draft.userInfo = false;
        draft.isLoggedIn = false;
        draft.loading = false;
        break;
      // case GET_USER_DATA_IN_STORAGE:
      //   draft.isLoggedIn = true;
      //   break;
    }
  });

export default logRegisterReducer;
