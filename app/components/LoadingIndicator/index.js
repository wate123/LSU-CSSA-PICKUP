/**
 *
 * LoadingIndicator
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function LoadingIndicator() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

LoadingIndicator.propTypes = {};

export default LoadingIndicator;
