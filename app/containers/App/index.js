/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import PropTypes from 'prop-types';
import { Layout, Divider, notification } from 'antd';

import Home from 'containers/Home/Loadable';
import NotFound from 'containers/NotFound/Loadable';
import RequestPage from 'containers/RequestPage/Loadable';
import RequestStatus from 'containers/RequestStatus/Loadable';
import BeVolunteer from 'containers/BeVolunteer/Loadable';
import VolunteerPortal from 'containers/VolunteerPortal/Loadable';
// import saga from './saga';
// import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import Navbar from '../NavBar';

// import {
//   makeSelectisLoggedIn,
//   makeSelectIsLogout,
//   makeSelectIsRegisterSuccess,
// } from '../LogRegister/selectors';
import { checkAccessToken } from '../NavBar/actions';
import { makeSelectIsServerError } from '../NavBar/selectors';

const { Content, Footer } = Layout;

export function App({ isUnknownServerError }) {
  if (isUnknownServerError !== false) {
    notification.error({ message: '服务器挂了...' });
  }

  return (
    // <Router>
    <Layout style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <Navbar />
      <Content>
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
          <Route component={NotFound} />
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
  isUnknownServerError: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // isLoggedIn: makeSelectisLoggedIn(),
  // isError: makeSelectIsError(),
  isUnknownServerError: makeSelectIsServerError(),
  // isRelogin: makeSelectIsRelogin(),
  // isDuplicate: makeSelectIsDuplicate(),
  // isRegisterSuccess: makeSelectIsRegisterSuccess(),
  // isLogout: makeSelectIsLogout(),
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
