/**
 *
 * NavBar
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu, Dropdown, Icon, notification } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectisVolunteer,
  makeSelectuserInfo,
  makeSelectisLoggedIn,
  makeSelectIsError,
} from '../LogRegister/selectors';
import reducer from './reducer';
import saga from './saga';
import LogRegister from '../LogRegister';
import NavMenu from '../../components/NavMenu';
import messages from './messages';
import { getUserData, logout } from '../LogRegister/actions';
import { makeSelectLocation } from './selectors';
import { checkAccessToken } from './actions';

export function NavBar({
  logoutAction,
  isLoggedIn,
  isVolunteer,
  userInfo,
  getUserDataInStorage,
  checkAccessToken,
  isError,
  location,
  toVolunteerPortal,
  toHome,
  toRequestStatus,
}) {
  useInjectReducer({ key: 'navBar', reducer });
  useInjectSaga({ key: 'navBar', saga });
  // const loginNotification = () => {
  //   const hrs = new Date().getHours();
  //   let greet = '你好,小彩蛋';
  //   if (hrs < 12) greet = '早上好!';
  //   else if (hrs >= 12 && hrs <= 17) greet = '下午好!';
  //   else if (hrs >= 17 && hrs <= 24) greet = '晚上好!';
  //   notification.success({
  //     message: `${greet} ${userInfo.name ? userInfo.name : userInfo.email}`,
  //     // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  //   });
  // };

  useEffect(() => {
    if (userInfo.accessToken !== undefined) {
      checkAccessToken();
    }
    // if (userInfo != null) {
    //   checkAccessToken();
    // }
    getUserDataInStorage();
    // if (isLoggedIn) {
    //   loginNotification();
    // }
  }, [checkAccessToken, getUserDataInStorage]);
  const NavMenuProps = {
    isVolunteer,
    userInfo,
    isLoggedIn,
    logoutAction,
    location,
    toVolunteerPortal,
    toHome,
    toRequestStatus,
  };
  // return isLoggedIn ? (
  //   <NavMenu {...NavMenuProps} />
  // ) : (
  //   <Menu
  //     theme="light"
  //     mode="horizontal"
  //     // defaultOpenKeys={[location.pathname]}
  //     defaultSelectedKeys={['/']}
  //     style={{ lineHeight: '64px', borderBottom: '0px' }}
  //     // selectedKeys={[...location.pathname]}
  //   >
  //     <Menu.Item key="/">
  //       <Link to="/">首页</Link>
  //     </Menu.Item>
  //     <LogRegister />
  //   </Menu>
  // );
  // return <NavMenu {...NavMenuProps} />;
  return isLoggedIn ? (
    <NavMenu {...NavMenuProps} />
  ) : (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['/']}
      style={{ lineHeight: '64px', borderBottom: '0px' }}
    >
      <Menu.Item key="/">
        <Link to="/">首页</Link>
      </Menu.Item>
      <LogRegister />
    </Menu>
  );
}

NavBar.propTypes = {
  logoutAction: PropTypes.func,
  getUserDataInStorage: PropTypes.func,
  isTokenExpire: PropTypes.bool,
  isVolunteer: PropTypes.bool,
  userInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectisLoggedIn(),
  // isVolunteer: makeSelectisVolunteer(),
  userInfo: makeSelectuserInfo(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(logout(evt.key));
      // dispatch(push('/'));
    },
    getUserDataInStorage: () => {
      dispatch(getUserData());
    },
    checkAccessToken: () => {
      dispatch(checkAccessToken());
    },
    toVolunteerPortal: () => {
      dispatch(push('/volunteer'));
    },
    toRequestStatus: () => {
      dispatch(push('/requestStatus'));
    },
    toHome: () => {
      dispatch(push('/'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NavBar);
