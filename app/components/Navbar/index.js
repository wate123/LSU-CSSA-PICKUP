/**
 *
 * Navbar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

// import { FormattedMessage } from 'react-intl';
import LogRegister from 'containers/LogRegister';
// import messages from './messages';

function Navbar() {
  return (
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['/']}
      style={{ lineHeight: '64px', borderBottom: '0px' }}
      // selectedKeys={[selectMenu]}
    >
      <Menu.Item key="/">
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="/requestStatus">
        <Link to="/requestStatus">接机状态</Link>
      </Menu.Item>
      <Menu.Item key="/volunteer">
        <Link to="/volunteer">志愿者</Link>
      </Menu.Item>
      <LogRegister />
    </Menu>
  );
}

Navbar.propTypes = {};

export default memo(Navbar);
