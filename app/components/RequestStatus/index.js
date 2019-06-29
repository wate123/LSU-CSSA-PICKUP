/**
 *
 * RequestStatusForm
 *
 */

import React, { useState } from 'react';
import { Timeline, Col, Row, Drawer, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const shortid = require('shortid');

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);
function RequestStatusForm({
  // changeRequestInfo,
  loading,
  cancelRequestAction,
  isDrawerVisible,
  volunteerDetail,
  toggleDrawer,
  RequestStatus,
}) {
  // const { isDrawerVisible, toggleDrawer } = useState(false);
  const StatusTimeline = statues => {
    const lastStatus = statues.slice(-1)[0];
    if (lastStatus.includes('正在匹配志愿者')) {
      return (
        <React.Fragment>
          <Timeline
            pending={`${lastStatus} ${new Date().toLocaleString('en-US')}`}
            reverse
          >
            {statues
              .filter(val => val !== lastStatus)
              .map(val => (
                <Timeline.Item key={shortid.generate()}>{val}</Timeline.Item>
              ))}
          </Timeline>
        </React.Fragment>
      );
    }
    return (
      <Timeline key={shortid.generate()} reverse>
        {statues.map(val => {
          if (val === lastStatus) {
            return (
              <React.Fragment key={shortid.generate()}>
                <Timeline.Item key={shortid.generate()}>{val}</Timeline.Item>
                <p>
                  <a onClick={() => toggleDrawer()}>查看ta的信息</a>
                </p>
              </React.Fragment>
            );
          }
          return <Timeline.Item key={shortid.generate()}>{val}</Timeline.Item>;
        })}
      </Timeline>
    );
  };
  if (RequestStatus === false || !RequestStatus.length) {
    return (
      <Row type="flex" justify="center" style={{ margin: '20px' }}>
        <Col xs={20} lg={10}>
          <div className="status" align="center">
            <Timeline>
              <Timeline.Item key={shortid.generate()}>
                没有任何接机申请
              </Timeline.Item>
            </Timeline>
          </div>
        </Col>
      </Row>
    );
  }
  return (
    <Row type="flex" justify="center">
      <Col xs={20} lg={20} align="center" style={{ margin: '20px' }}>
        <Link to="/pickupRequest">
          <Button size="large">更改接机信息</Button>
        </Link>
        <Button size="large" loading={loading} onClick={cancelRequestAction}>
          取消接机申请
        </Button>
      </Col>
      <Col xs={20} lg={20} style={{ marginTop: '100px' }} align="center">
        <div>{StatusTimeline(RequestStatus)}</div>
      </Col>
      <Drawer
        width={320}
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={isDrawerVisible}
      >
        <p style={{ ...pStyle, marginBottom: 24 }}>志愿者信息</p>
        {loading ? (
          <Skeleton active />
        ) : (
          <div>
            <Row>
              <Col span={12}>
                <DescriptionItem title="全名" content={volunteerDetail.name} />
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <DescriptionItem title="邮箱" content={volunteerDetail.email} />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="性别"
                  content={
                    volunteerDetail.sex === '无' ||
                    volunteerDetail.sex === undefined
                      ? '未知~'
                      : volunteerDetail.sex
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="专业"
                  content={
                    volunteerDetail.major === '无' ||
                    volunteerDetail.major === undefined
                      ? '未知~'
                      : volunteerDetail.major
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="攻读学位"
                  content={
                    volunteerDetail.degree === '无' ||
                    volunteerDetail.degree === undefined
                      ? '未知~'
                      : volunteerDetail.degree
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="车型"
                  content={
                    volunteerDetail.car === '无' ||
                    volunteerDetail.car === undefined
                      ? '未知~'
                      : volunteerDetail.car
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col span={17}>
                <DescriptionItem
                  title="联系方式"
                  content={
                    volunteerDetail.contact === '无' ||
                    volunteerDetail.contact === undefined
                      ? '未知~'
                      : volunteerDetail.contact
                  }
                />
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </Row>
  );
}

RequestStatusForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  isDrawerVisible: PropTypes.bool,
  volunteerDetail: PropTypes.object,
  toggleDrawer: PropTypes.func,
  RequestStatus: PropTypes.func,
  cancelRequestAction: PropTypes.func.isRequired,
};

export default RequestStatusForm;
