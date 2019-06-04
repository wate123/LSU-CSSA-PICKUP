/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import PropTypes from 'prop-types';
import { Layout, Divider, message, notification } from 'antd';

import Home from 'containers/Home/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RequestPage from 'containers/RequestPage/Loadable';
import RequestStatus from 'containers/RequestStatus/Loadable';
import BeVolunteer from 'containers/BeVolunteer/Loadable';
import VolunteerPortal from 'containers/VolunteerPortal/Loadable';
// import saga from './saga';
// import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import Navbar from '../NavBar';

import {
  makeSelectisLoggedIn,
  makeSelectIsLogout,
  makeSelectIsError,
  makeSelectIsRegisterSuccess,
} from '../LogRegister/selectors';
import { checkAccessToken } from '../NavBar/actions';
import { getUserData } from '../LogRegister/actions';
import { makeSelectIsServerError } from '../NavBar/selectors';

const { Content, Footer } = Layout;
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
}
export function App({
  isLoggedIn,
  checkExpired,
  isError,
  isRelogin,
  isUnknownServerError,
  isDuplicate,
  isWrongPassword,
  isLoginSuccess,
  isRegisterSuccess,
  isLogout,
}) {
  // useInjectSaga({ key: 'app', saga });
  // if (isRelogin !== false) {
  //   notification.error({ message: '请重新登录' });
  // }
  if (isUnknownServerError !== false) {
    notification.error({ message: '服务器挂了...' });
  }
  // if (isDuplicate !== false) {
  //   message.error({ message: '账号已存在' });
  // }
  // if (isWrongPassword !== false) {
  //   message.error({ message: '密码错误' });
  // }
  if (isLoggedIn) {
    const hrs = new Date().getHours();
    let greet = '你好,小彩蛋';
    if (hrs < 12) greet = '早上好!';
    else if (hrs >= 12 && hrs <= 17) greet = '下午好!';
    else if (hrs >= 17 && hrs <= 24) greet = '晚上好!';
    notification.success({
      message: `${greet} ${
        sessionStorage.getItem('name')
          ? sessionStorage.getItem('name')
          : sessionStorage.getItem('email')
      }`,
      // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
  }
  // // console.log(isRegisterSuccess);
  if (isRegisterSuccess) {
    notification.success({
      message: '欢迎使用CSSA接机系统',
      description: '请尽快完善你的信息',
      // icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
  }
  //  else if (isRegisterSuccess === false) {
  //   message.error('換個郵箱吧～這個被人用過了', 5);
  // }
  // if (isLogout) {
  //   notification.success({ message: '客官下次再来(´థ౪థ）σ' });
  // }
  return (
    // <Router>
    <Layout style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <Navbar />
      <Content className="main-layout-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/pickupRequest"
            component={RequestPage}
            // render={props => <RequestPage location={props.location} />}
          />
          {/* <PrivateRoute
              authed={isLoggedIn}
              path="/pickupRequest"
              component={RequestPage}
            />
            <PrivateRoute
              authed={isLoggedIn}
              path="/requestStatus"
              component={RequestStatus}
            /> */}
          <Route
            exact
            path="/requestStatus"
            component={RequestStatus}
            // render={props => <RequestStatus location={props.location} />}
          />
          <Route
            exact
            path="/beVolunteer"
            component={BeVolunteer}
            // render={props => <BeVolunteer location={props.location} />}
          />
          <Route
            exact
            path="/volunteer"
            component={VolunteerPortal}
            // render={props => <VolunteerPortal location={props.location} />}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Content>

      <Footer className="footer" style={{ textAlign: 'center' }}>
        <Divider />
        LSU CSSA接机系统 ©{new Date().getFullYear()} 林俊
      </Footer>
      <GlobalStyle />
    </Layout>
  );
}
App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectisLoggedIn(),
  // isError: makeSelectIsError(),
  isUnknownServerError: makeSelectIsServerError(),
  // isRelogin: makeSelectIsRelogin(),
  // isDuplicate: makeSelectIsDuplicate(),
  isRegisterSuccess: makeSelectIsRegisterSuccess(),
  isLogout: makeSelectIsLogout(),
  // isWrongPassword: makeSelectIsWrongPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkExpired: () => dispatch(checkAccessToken()),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(App);
