/**
 *
 * BeVolunteer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, List } from 'antd';

// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { push } from 'connected-react-router';
import { makeSelectVolunteerError, makeSelectVolunteerData } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import VolunteerForm from '../../components/VolunteerForm';
import { makeSelectisLoggedIn } from '../LogRegister/selectors';
import { submitRequest, submitVolunteerAfterConfirm } from './actions';
import { checkAccessToken } from '../NavBar/actions';
const { confirm } = Modal;

/**
 * @return {null}
 */
export function BeVolunteer({
  onSubmitRequest,
  onAfterConfirm,
  volunteerData,
  checkAuthExpiration,
  routeToHome,
}) {
  useInjectReducer({ key: 'beVolunteer', reducer });
  useInjectSaga({ key: 'beVolunteer', saga });
  const volunteerFormProp = {
    onSubmitRequest,
    onAfterConfirm,
    volunteerData,
  };
  useEffect(() => {
    checkAuthExpiration();
  });
  // if (loading) {
  //   checkAuthExpiration();
  // }
  // console.log(isLoggedIn);
  // if (isLoggedIn) {
  //   return <VolunteerForm {...volunteerFormProp} />;
  // }
  if (sessionStorage.getItem('isVolunteer')) {
    return <VolunteerForm {...volunteerFormProp} />;
  }

  routeToHome();
  return null;
}

BeVolunteer.propTypes = {
  onSubmitRequest: PropTypes.func,
  checkAuthExpiration: PropTypes.func,
  onAfterConfirm: PropTypes.func,
  volunteerData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  volunteerError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  volunteerData: makeSelectVolunteerData(),
  volunteerError: makeSelectVolunteerError(),
  isLoggedIn: makeSelectisLoggedIn(),
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
            case 'sex':
              return `性别: ${formObject[field]}`;

            case 'major':
              return `专业: ${formObject[field]}`;

            case 'degree':
              return `攻读学位: ${formObject[field]}`;

            case 'car':
              return `车型: ${formObject[field]}`;

            case 'contact':
              return `联系方式: ${formObject[field]}`;

            case 'email':
              return `邮箱: ${formObject[field]}`;
            default:
              break;
          }
        })
        .filter(val => val !== undefined);
      formObject = {
        ...formObject,
        accepted: null,
        isVolunteer: true,
      };
      // console.log(confirmList);
      // console.log(formObject);
      confirm({
        title: '确认提交',
        content: (
          <List
            className="list"
            header={
              <div className="listHeader">
                以下内容将会私信给每位你接受的申请者
              </div>
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
      dispatch(submitVolunteerAfterConfirm(formData));
    },
    checkAuthExpiration: () => {
      dispatch(checkAccessToken());
    },
    routeToHome: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BeVolunteer);
