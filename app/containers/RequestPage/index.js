/**
 *
 * RequestPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Modal, List } from 'antd';
import { withRouter } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectRequestConfirmList,
  makeSelectRequestData,
  makeSelectRequestError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import RequestForm from '../../components/RequestForm';
import { submitRequest, submitRequestAfterConfirm } from './actions';
import Auth from '../../utils/Auth';
import { checkAccessToken } from '../NavBar/actions';
import { makeSelectisLoggedIn } from '../LogRegister/selectors';

const { confirm } = Modal;
export function RequestPage({
  onSubmitRequest,
  requestData,
  onAfterConfirm,
  checkAuthExpiration,
  isLoggedIn,
  loading,
  routeToHome,
}) {
  useInjectReducer({ key: 'requestPage', reducer });
  useInjectSaga({ key: 'requestPage', saga });
  const requestFormProp = {
    onSubmitRequest,
    onAfterConfirm,
    requestData,
  };
  useEffect(() => {
    checkAuthExpiration();
  });
  // if (loading) {
  //   checkAuthExpiration();
  // }
  if (isLoggedIn) {
    return <RequestForm {...requestFormProp} />;
  }
  return routeToHome();
  // return null;
  // return !isTokenExpired ? <RequestForm {...requestFormProp} /> : routeToHome();
}

RequestPage.propTypes = {
  onSubmitRequest: PropTypes.func.isRequired,
  onAfterConfirm: PropTypes.func.isRequired,
  requestData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  requestError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  requestData: makeSelectRequestData(),
  requestError: makeSelectRequestError(),
  isLoggedIn: makeSelectisLoggedIn(),
  // loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitRequest: (formData, onAfterConfirm) => {
      let formObject = {
        email: sessionStorage.getItem('email'),
        ...formData,
      };

      const confirmList = Object.keys(formObject)
        .map(field => {
          if (formObject[field] === undefined) {
            formObject[field] = '无';
          }
          switch (field) {
            case 'name':
              return `姓名: ${formObject[field]}`;
            case 'hometown':
              return `来自: ${formObject[field]}`;

            case 'school':
              return `毕业学校: ${formObject[field]}`;

            case 'airport':
              return `抵达机场: ${
                formObject[field] === 'other'
                  ? formObject.otherAirport
                  : formObject[field]
              }`;

            case 'date':
              return `抵达日期: ${formObject[field].format('l')}`;

            case 'time':
              return `抵达时间: ${formObject[field].format('LT')}`;

            case 'luggage':
              return `行李数量: ${formObject[field]}`;

            case 'phone':
              return `电话号码: ${formObject[field]}`;

            case 'social':
              return `社交平台: ${formObject[field]}`;

            case 'toVolunteer':
              return `想对志愿者说: ${formObject[field]}`;
            case 'email':
              return `邮箱: ${formObject[field]}`;
            default:
              break;
          }
        })
        .filter(val => val !== undefined);
      formObject = {
        ...formObject,
        date: formData.date.format('YYYY-MM-DD'),
        time: formData.time.format('HH:mm:ss'),
        accepted: false,
        isVolunteer: false,
      };
      // console.log(confirmList);
      // console.log(formObject);
      confirm({
        title: '确认提交',
        content: (
          <List
            className="list"
            header={
              <div className="listHeader">以下内容将会公开给所有的志愿者</div>
            }
            dataSource={confirmList}
            renderItem={item => <List.Item className="list">{item}</List.Item>}
          />
        ),
        onOk() {
          onAfterConfirm(formObject);
        },
        onCancel() {},
      });

      dispatch(submitRequest());
    },
    onAfterConfirm: formData => {
      dispatch(submitRequestAfterConfirm(formData));
    },
    checkAuthExpiration: () => {
      dispatch(checkAccessToken());
    },
    // routeToHome: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(RequestPage));
