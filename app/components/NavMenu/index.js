/**
 *
 * Menu
 *
 */

import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function NavMenu({
  logoutAction,
  // isLoggedIn,
  userInfo,
  location,
  toVolunteerPortal,
  toHome,
  toRequestStatus,
}) {
  const LoggedDropDown = () => (
    <Menu onClick={logoutAction}>
      <Menu.Item key="exit">
        <Link to="/">
          <Icon style={{ textAlign: 'left' }} type="logout" />
          注销{' '}
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <React.Fragment>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={[location.pathname]}
        style={{ lineHeight: '64px', borderBottom: '0px' }}
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key="/" onClick={toHome}>
          首页
          {/* <Link to="/">首页</Link> */}
        </Menu.Item>
        {userInfo.isVolunteer && userInfo.name !== undefined ? (
          <Menu.Item key="/volunteer" onClick={toVolunteerPortal}>
            接机列表
            {/* <Link to="/volunteer">接机列表</Link> */}
          </Menu.Item>
        ) : (
          <Menu.Item key="/requestStatus" onClick={toRequestStatus}>
            接机状态
            {/* <Link to="/requestStatus">接机状态</Link> */}
          </Menu.Item>
        )}
        <Menu.Item key="user" style={{ float: 'right' }}>
          <Dropdown overlay={LoggedDropDown(logoutAction)}>
            <div className="ant-dropdown-link">
              {userInfo.name === '' ? userInfo.email : userInfo.name}
              <Icon type="down" />
            </div>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

NavMenu.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  // isVolunteer: PropTypes.bool,
  location: PropTypes.object,
  toVolunteerPortal: PropTypes.func,
  toHome: PropTypes.func,
  toRequestStatus: PropTypes.func,
  userInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default NavMenu;
