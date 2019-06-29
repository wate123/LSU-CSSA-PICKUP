/**
 *
 * Home
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
// import { FormattedMessage } from 'react-intl';
import { Row, Col, Card, Button, Popover, Menu } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import LogRegister from '../LogRegister';
import {
  makeSelectisLoggedIn,
  makeSelectisVolunteer,
  makeSelectuserInfo,
} from '../LogRegister/selectors';
import { toggleLoginModal, toggleRegisterModal } from '../LogRegister/actions';

export function Home({ isLoggedIn, userInfo, toggleLogin, toggleRegister }) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  const [isVisible, setVisibility] = useState(false);
  // if (isLoggedIn) {
  //   setVisibility(!isVisible);
  // }
  const SwitchUserButton = () => (
    <Row
      type="flex"
      justify="center"
      gutter={{ xs: 8, sm: 16, md: 24 }}
      style={{ padding: '50px' }}
    >
      {userInfo.isVolunteer ? (
        <Col>
          <Link to="beVolunteer">
            <Button type="primary" shape="round">
              成为志愿者
            </Button>
          </Link>
        </Col>
      ) : (
        <Col>
          <Link to="pickupRequest">
            <Button type="primary" shape="round">
              申请接机
            </Button>
          </Link>
        </Col>
      )}
    </Row>
  );
  return (
    <React.Fragment>
      <Row type="flex" justify="center" gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Card
          hoverable
          style={{ width: '80%', height: '500px', marginTop: '20px' }}
          // cover={}
        />
      </Row>
      {!isLoggedIn ? (
        <Row
          type="flex"
          justify="space-around"
          gutter={{ xs: 8, sm: 16, md: 24 }}
        >
          <Col style={{ padding: '50px' }}>
            <Popover
              content={
                <div>
                  <Button onClick={toggleLogin}>登录</Button>
                  <Button onClick={toggleRegister}>注册</Button>
                </div>
              }
              title="请先登陆或者注册"
              visible={isVisible}
              onVisibleChange={() => setVisibility(!isVisible)}
            >
              <Button type="primary" shape="round">
                申请接机
              </Button>
            </Popover>
          </Col>
          <Col style={{ padding: '50px' }}>
            <Popover
              content={
                <div>
                  <Button onClick={toggleLogin}>登录</Button>
                  <Button onClick={toggleRegister}>注册</Button>
                </div>
              }
              title="请先登陆或者注册"
              visible={isVisible}
              onVisibleChange={() => setVisibility(!isVisible)}
            >
              <Button type="primary" shape="round">
                成为志愿者
              </Button>
            </Popover>
          </Col>
        </Row>
      ) : (
        <SwitchUserButton />
      )}
    </React.Fragment>
  );
}

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectisLoggedIn(),
  isVolunteer: makeSelectisVolunteer(),
  userInfo: makeSelectuserInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleLogin: () => {
      dispatch(toggleLoginModal());
    },
    toggleRegister: () => dispatch(toggleRegisterModal()),
    toPickupRequestPage: () => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(push('/pickupRequest'));
    },
    toVolunteerPage: () => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(push('/beVolunteer'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Home);
