/**
 *
 * RequestStatus
 *
 */

import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import io from 'socket.io-client';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectIsRequestExist,
  makeSelectRequestStatus,
  makeSelectVolunteerInfo,
  makeSelectIsDrawerVisible,
  makeSelectIsLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { cancelRequest, getRequestStatus, getVolunteerDetail } from './actions';
import { API_ROOT } from '../../../config/api-config';

import RequestStatusCom from '../../components/RequestStatus';
import { checkAccessToken } from '../NavBar/actions';
import { makeSelectisLoggedIn } from '../LogRegister/selectors';

const socket = io(API_ROOT, { secure: true });
export function RequestStatus({
  isRequestExist,
  cancelRequestAction,
  RequestStatus,
  requestForStatus,
  toggleDrawer,
  volunteerDetail,
  isDrawerVisible,
  loading,
  // getVolunteerInfo,
  // changeRequestInfo,
}) {
  useInjectReducer({ key: 'requestStatus', reducer });
  useInjectSaga({ key: 'requestStatus', saga });
  // checkAccessTokenExpire();
  // requestForStatus();
  useEffect(() => {
    requestForStatus();
  }, [requestForStatus]);
  const requestStatusProps = {
    isRequestExist,
    cancelRequestAction,
    RequestStatus,
    toggleDrawer,
    volunteerDetail,
    isDrawerVisible,
    loading,
    // getVolunteerInfo,
    // changeRequestInfo,
  };
  // console.log(!isTokenExpire);
  // if (isLoggedIn) {
  //   return <RequestStatusCom {...requestStatusProps} />;
  // }
  socket.on('volunteer accepted', () => {
    requestForStatus();
  });
  return <RequestStatusCom {...requestStatusProps} />;
}

RequestStatus.propTypes = {
  cancelRequestAction: PropTypes.func.isRequired,
  isRequestExist: PropTypes.bool.isRequired,
  RequestStatus: PropTypes.array,
  requestForStatus: PropTypes.func,
  toggleDrawer: PropTypes.func,
  volunteerDetail: PropTypes.object,
  isDrawerVisible: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isRequestExist: makeSelectIsRequestExist(),
  isLoggedIn: makeSelectisLoggedIn(),
  RequestStatus: makeSelectRequestStatus(),
  volunteerDetail: makeSelectVolunteerInfo(),
  isDrawerVisible: makeSelectIsDrawerVisible(),
  loading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    cancelRequestAction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(cancelRequest());
    },
    checkAccessTokenExpire: () => {
      dispatch(checkAccessToken());
    },
    requestForStatus: () => {
      dispatch(getRequestStatus());
    },
    routeToHome: () => dispatch(push('/')),
    toggleDrawer: () => dispatch(getVolunteerDetail()),
    // getVolunteerInfo: () => dispatch(getVolunteerDetail()),
    // changeRequestInfo: () => dispatch(push('/pickupRequest')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RequestStatus);
