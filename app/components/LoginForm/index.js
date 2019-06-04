/**
 *
 * LoginForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

function LoginForm({ form, onSubmitLogin, toggleRegister }) {
  const { getFieldDecorator } = form;
  const submitLogin = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onSubmitLogin({
          email: values.email.toLowerCase(),
          password: values.password,
        });
      }
    });
  };
  return (
    <Form className="login-form" layout="horizontal" onSubmit={submitLogin}>
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
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="密码">
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: '请输入你的密码!',
            },
          ],
        })(<Input type="password" />)}
      </FormItem>
      <FormItem
        wrapperCol={{
          sm: {
            span: 18,
            offset: 3,
          },
        }}
      >
        {/* {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住我</Checkbox>)} */}
        <a className="login-form-forgot">忘记密码？</a>
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
        <Button className="ant-col-24" type="primary" htmlType="submit">
          登录
        </Button>
        或者 <a onClick={toggleRegister}>现在注册!</a>
      </FormItem>
    </Form>
  );
}

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
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
