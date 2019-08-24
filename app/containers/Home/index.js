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
import { Row, Col, Button, message, Alert } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import marketing from '../../images/04.png';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  makeSelectisLoggedIn,
  makeSelectisVolunteer,
  makeSelectuserInfo,
} from '../LogRegister/selectors';
import { toggleLoginModal, toggleRegisterModal } from '../LogRegister/actions';

const ImageWrapper = styled.img`
  display: flex;
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 600px) {
    width: 30%;
    height: 30%;
  }
`;

export function Home({ isLoggedIn, userInfo, notLoginNotification }) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  // const [isVisible, setVisibility] = useState(false);
  // if (isLoggedIn) {
  //   setVisibility(!isVisible);
  // }
  const SwitchUserButton = () =>
    userInfo.name === '' ? (
      <Row
        type="flex"
        justify="space-around"
        align="middle"
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          paddingTop: '20px',
        }}
      >
        <Col>
          <Link to="beVolunteer">
            <Button type="primary" shape="round">
              成为志愿者
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="pickupRequest">
            <Button type="primary" shape="round">
              申请接机
            </Button>
          </Link>
        </Col>
      </Row>
    ) : (
      <Row
        type="flex"
        justify="center"
        align="middle"
        gutter={{ xs: 8, sm: 16, md: 24 }}
        style={{
          paddingTop: '20px',
        }}
      >
        {userInfo.isVolunteer ? (
          <Col>
            <Link to="beVolunteer">
              <Button type="primary" shape="round">
                修改个人信息
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
      <Row type="flex" justify="end" gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Alert
          message="通知"
          descrition="懒得再测试了... 有问题可以找微信wate123"
          type="info"
        />
      </Row>
      <Row type="flex" justify="center" gutter={{ xs: 7, sm: 16, md: 24 }}>
        <ImageWrapper alt="LSU CSSA" src={marketing} />
      </Row>
      {!isLoggedIn ? (
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          gutter={{ xs: 8, sm: 16, md: 24 }}
        >
          <Col
            style={{
              paddingBottom: '100px',
              paddingTop: '20px',
            }}
          >
            <Button onClick={notLoginNotification} type="primary" shape="round">
              申请接机
            </Button>
          </Col>
          <Col
            style={{
              paddingBottom: '100px',
              paddingTop: '20px',
            }}
          >
            <Button onClick={notLoginNotification} type="primary" shape="round">
              成为志愿者
            </Button>
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
  notLoginNotification: PropTypes.func.isRequired,
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
    notLoginNotification: () => {
      message.warning('请先登录!');
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
