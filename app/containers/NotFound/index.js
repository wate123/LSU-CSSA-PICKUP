/**
 *
 * NotFound
 *
 */

import React, { useEffect } from 'react';
import { Row, Col, Card, Skeleton } from 'antd';
import Media from 'react-media';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotFound, {
  makeSelectImage,
  makeSelectIsLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getImage } from './actions';
import { API_ROOT } from '../../../config/api-config';

export function NotFound({ requestImage, imageSrc, loading }) {
  useInjectReducer({ key: 'notFound', reducer });
  useInjectSaga({ key: 'notFound', saga });
  useEffect(() => {
    requestImage();
  }, [requestImage]);
  console.log(`${API_ROOT}/static/images/${imageSrc}`);

  return (
    <Media query="(max-width: 599px)">
      {matches =>
        matches ? (
          <LazyLoad height={500}>
            <Skeleton loading={loading}>
              <img
                src={`${API_ROOT}/static/images/${imageSrc}`}
                alt="小彩蛋"
                // height={500}
                style={{
                  // display: 'block',
                  // position: 'absolute',
                  width: '100%',
                  // marginLeft: 'auto',
                  // marginRight: 'auto',
                  marginTop: '100px',
                }}
              />
            </Skeleton>
          </LazyLoad>
        ) : (
          <LazyLoad height={500}>
            <Skeleton loading={loading}>
              <img
                src={`${API_ROOT}/static/images/${imageSrc}`}
                alt="小彩蛋"
                height={500}
                style={{
                  display: 'block',
                  width: '50%',
                  marginTop: '50px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
            </Skeleton>
          </LazyLoad>
        )
      }
    </Media>
  );
}

NotFound.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  imageSrc: makeSelectImage(),
  loading: makeSelectIsLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestImage: () => dispatch(getImage()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NotFound);
