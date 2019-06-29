/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React, { useState, useEffect } from 'react';
import { Row, Card, Col } from 'antd';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { API_ROOT } from '../../../config/api-config';
import request from '../../utils/request';

const requestRootURL = `${API_ROOT}`;
const options = formData => ({
  method: 'POST',
  body: formData,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
  // headers: new Headers({
  //   Authorization: `Basic ${formData}`,
  // }),
  credentials: 'omit',
});

const Wrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;
export default function NotFound() {
  useEffect(() => {});
  return (
    <Wrapper>
      <Row align="middle" justify="center">
        <Col span={24}>
          <Card style={{ width: 300 }} />
        </Col>
      </Row>
    </Wrapper>
  );
}
