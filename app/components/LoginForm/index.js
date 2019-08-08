/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Input, Button, Modal } from 'antd';
const shortid = require('shortid');
// import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

function LoginForm({
  form,
  onSubmitLogin,
  toggleRegister,
  toggleLogin,
  isLoginModelOpen,
  forgetPass,
  isForget,
  onSubmitForget,
}) {
  const { getFieldDecorator } = form;
  const submitLogin = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (isForget) {
          onSubmitForget({
            email: values.email.toLowerCase(),
          });
        } else {
          onSubmitLogin({
            email: values.email.toLowerCase(),
            password: values.password,
          });
        }
      }
    });
  };
  return (
    <Modal
      visible={isLoginModelOpen}
      mask
      destroyOnClose
      title="登录"
      onCancel={() => toggleLogin()}
      footer=""
    >
      <Form id={shortid.generate()} layout="horizontal" onSubmit={submitLogin}>
        <FormItem {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '错误邮箱地址!',
              },
              {
                required: true,
                message: '请输入邮箱地址!',
              },
            ],
          })(<Input id={shortid.generate()} />)}
        </FormItem>
        {isForget ? (
          <FormItem
            wrapperCol={{
              xs: {
                span: 26,
                offset: 0,
              },
              sm: {
                span: 18,
                offset: 3,
              },
            }}
          >
            <Button className="ant-col-24" type="primary" htmlType="submit">
              提交
            </Button>
            <a onClick={forgetPass}>不好意思Σ（ﾟдﾟlll） 我突然想起来了</a>
          </FormItem>
        ) : (
          <React.Fragment>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入你的密码!',
                  },
                ],
              })(<Input id={shortid.generate()} type="password" />)}
            </FormItem>

            <FormItem
              wrapperCol={{
                xs: {
                  span: 26,
                  offset: 0,
                },
                sm: {
                  span: 18,
                  offset: 3,
                },
              }}
            >
              <a onClick={forgetPass}>忘记密码？</a>
              <div />
              <Button className="ant-col-24" type="primary" htmlType="submit">
                登录
              </Button>
              或者 <a onClick={toggleRegister}>现在注册!</a>
            </FormItem>
          </React.Fragment>
        )}
      </Form>
    </Modal>
  );
}

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  // onLoginSubmitted: PropTypes.func.isRequired,
};

export default Form.create({
  name: 'login_state',
  // onFieldsChange(props, changeFields) {
  //   props.onChange(changeFields);
  // },
  // mapPropsToFields(props) {
  //   return {
  //     email: Form.createFormField({
  //       ...props.
  //     })
  //   };
  // },
})(memo(LoginForm));
