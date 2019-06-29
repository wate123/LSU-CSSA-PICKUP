/**
 *
 * VolunteerPortal
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import io from 'socket.io-client';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectRequesterData,
  makeSelectIsAccessTokenExpired,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { API_ROOT } from '../../../config/api-config';

// import messages from './messages';
import DisplayRequests from '../../components/DisplayRequests';
import { getRequesterData, acceptRequest } from './actions';

const socket = io(API_ROOT, { secure: true });
export function VolunteerPortal({
  dispatchGetRequesterData,
  requestsData,
  loading,
  acceptRequest,
}) {
  useInjectReducer({ key: 'volunteerPortal', reducer });
  useInjectSaga({ key: 'volunteerPortal', saga });
  const displayRequestsProps = {
    dispatchGetRequesterData,
    loading,
    requestsData,
    acceptRequest,
  };

  useEffect(() => {
    // if (requestsData === false) {
    //   dispatchGetRequesterData();
    // }
    dispatchGetRequesterData();
  }, [dispatchGetRequesterData]);
  // if (isAccessTokenExpired) {
  //   notification.error({
  //     message: '请重新登录',
  //   });
  // }
  socket.on('pickup request', () => {
    dispatchGetRequesterData();
  });
  return <DisplayRequests {...displayRequestsProps} />;
}

VolunteerPortal.propTypes = {
  dispatchGetRequesterData: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  requestsData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  isAccessTokenExpired: makeSelectIsAccessTokenExpired(),
  requestsData: makeSelectRequesterData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetRequesterData: () => dispatch(getRequesterData()),
    acceptRequest: id => dispatch(acceptRequest(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VolunteerPortal);
