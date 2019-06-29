/**
 *
 * LogRegister
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoginModel,
  makeSelectRegisterModel,
  // makeSelectSuccessRegisterCallback,
  // makeSelectSuccessLoginCallback,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import LoginForm from '../../components/LoginForm';
import {
  toggleLoginModal,
  toggleRegisterModal,
  onLoginSubmit,
  onRegisterSubmit,
} from './actions';
import RegisterForm from '../../components/RegisterForm';
import Auth from '../../utils/Auth';
// import Notification from '../../components/Notification';

export function LogRegister({
  toggleLogin,
  isLoginModelOpen,
  toggleRegister,
  isRegisterModelOpen,
  onSubmitLogin,
  onSubmitRegister,
  // registerSuccessCallback,
  // loginSuccessCallback,
  // onLoginSubmitted,
}) {
  useInjectReducer({ key: 'logRegister', reducer });
  useInjectSaga({ key: 'logRegister', saga });

  const loginProps = {
    isLoginModelOpen,
    toggleLogin,
    onSubmitLogin,
    toggleRegister,
  };
  const registerProps = {
    isRegisterModelOpen,
    toggleRegister,
    onSubmitRegister,
    toggleLogin,
  };

  // if(!Auth.isUserAuthenticated())
  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{ lineHeight: '64px', borderBottom: '0px', float: 'right' }}
    >
      <Menu.Item>
        <a type="link" onClick={() => toggleLogin()}>
          <FormattedMessage {...messages.login} />
        </a>
        <LoginForm {...loginProps} />
      </Menu.Item>
      <Menu.Item>
        <a type="link" onClick={() => toggleRegister()}>
          <FormattedMessage {...messages.register} />
        </a>
        <RegisterForm {...registerProps} />
      </Menu.Item>
    </Menu>
  );
}

LogRegister.propTypes = {
  toggleLogin: PropTypes.func,
  toggleRegister: PropTypes.func,
  isLoginModelOpen: PropTypes.bool,
  isRegisterModelOpen: PropTypes.bool,
  onSubmitLogin: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoginModelOpen: makeSelectLoginModel(),
  isRegisterModelOpen: makeSelectRegisterModel(),
  // registerSuccessCallback: makeSelectSuccessRegisterCallback(),
  // loginSuccessCallback: makeSelectSuccessLoginCallback(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleLogin: () => {
      dispatch(toggleLoginModal());
    },
    toggleRegister: () => dispatch(toggleRegisterModal()),
    // onSubmitLogin: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(onLoginSubmit());
    // },
    onSubmitLogin: data => {
      dispatch(onLoginSubmit(data));
    },
    onSubmitRegister: data => {
      dispatch(onRegisterSubmit(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LogRegister);
