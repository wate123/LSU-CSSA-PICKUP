/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * RegisterForm
 *
 */

import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
const shortid = require('shortid');
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 10 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

function RegisterForm({
  form,
  onSubmitRegister,
  toggleLogin,
  isRegisterModelOpen,
  toggleRegister,
}) {
  const { getFieldDecorator } = form;
  let confirmDirty = false;

  const handleConfirmBlur = e => {
    confirmDirty = confirmDirty || !!e.target.value;
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不符!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const handleRegisterSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmitRegister({
          email: values.email.toLowerCase(),
          password: values.password,
          isVolunteer: values.isVolunteer,
        });
      }
    });
  };
  return (
    <Modal
      visible={isRegisterModelOpen}
      mask
      destroyOnClose
      title="注册"
      onCancel={() => toggleRegister()}
      footer=""
    >
      <Form
        id={shortid.generate()}
        layout="horizontal"
        onSubmit={handleRegisterSubmit}
      >
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
          })(<Input placeholder="没有任何限制,可用LSU邮箱" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                min: 8,
                message: '请输入至少8位数密码!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input type="password" placeholder="至少8位数密码" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="确认密码">
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请确认你的密码!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input type="password" onBlur={handleConfirmBlur} />)}
        </FormItem>
        {/* <FormItem {...checkboxLayout}>
        {getFieldDecorator('isVolunteer', {
          initialValue: false,
        })(<Checkbox>是否成为志愿者</Checkbox>)}
      </FormItem> */}

        <FormItem
          wrapperCol={{
            xs: {
              span: 26,
              offset: 0,
            },
            sm: {
              span: 16,
              offset: 5,
            },
          }}
        >
          <Button className="ant-col-24" type="primary" htmlType="submit">
            注册
          </Button>
          或者 <a onClick={toggleLogin}>登录!</a>
        </FormItem>
      </Form>
    </Modal>
  );
}

RegisterForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmitRegister: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
};

export default Form.create()(withRouter(RegisterForm));
