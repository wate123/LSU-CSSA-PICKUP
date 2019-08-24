/**
 *
 * VolunteerForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Checkbox,
  Button,
  Radio,
  Typography,
} from 'antd';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
let checkJoin = false;
// eslint-disable-next-line no-unused-vars
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { justify: 'end', span: 24 },
    sm: { justify: 'end', span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const radioGroupLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 15 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const onChangeJoinMaillit = e => {
  checkJoin = e.target.checked;
};

function VolunteerForm({
  form,
  onSubmitRequest,
  onAfterConfirm,
  // volunteerData,
}) {
  const { getFieldDecorator } = form;

  const handelSubmitRequest = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        onSubmitRequest(fieldsValue, onAfterConfirm);
      }
    });
  };
  return (
    <Row justify="start">
      <Col
        span={12}
        offset={5}
        // style={{ marginTop: '50px', marginBottom: '100px' }}
      >
        {/* <Title level={3}>志愿者表单</Title> */}
        <Form
          layout="horizontal"
          onSubmit={handelSubmitRequest}
          style={{ marginBottom: '100px' }}
        >
          <FormItem {...formItemLayout}>
            <Title level={3}>志愿者表单</Title>
          </FormItem>
          <FormItem {...formItemLayout} label={<span>姓名&nbsp;</span>}>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '─=≡Σ(((つ•̀ω•́)つ🤣',
                  whitespace: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...radioGroupLayout} label="性别">
            {getFieldDecorator('sex', {
              rules: [{ required: true, message: 'o(*////▽////*)q' }],
            })(
              <RadioGroup>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
                <Radio value="?.?">?.?</Radio>
              </RadioGroup>,
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="专业">
            {getFieldDecorator('major', {
              rules: [{ whitespace: true }],
            })(<Input />)}
          </FormItem>

          <FormItem {...radioGroupLayout} label="攻读学位">
            {getFieldDecorator('degree', {})(
              <RadioGroup>
                <Radio value="本科">本科</Radio>
                <Radio value="硕士">硕士</Radio>
                <Radio value="博士">博士</Radio>
                <Radio value="访问学者">访问学者</Radio>
                <Radio value="其他">其他</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="车型">
            {getFieldDecorator('car', {})(
              <Input placeholder="小轿车？ SUV？ 等等" />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            {getFieldDecorator('note', {})(
              <TextArea
                rows={4}
                placeholder="留给接机申请人的注意事项"
              />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                联系方式&nbsp;
                <Tooltip title="微信,QQ,短信,手机号码等等">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('contact', {
              rules: [{ required: true, message: '至少留下一种联系方式' }],
            })(<Input placeholder="请注明哪种联系方式" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                想对我们说&nbsp;
                <Tooltip title="不会公开的哟~">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('toCSSA', {})(
              <TextArea
                rows={4}
                placeholder="可以是建议,也可以是调戏( ͡° ͜ʖ ͡°)"
              />,
            )}
          </FormItem>
          <FormItem
            labelCol={{
              xs: { justify: 'end', span: 24 },
              sm: { justify: 'end', span: 10 },
            }}
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            }}
          >
            {getFieldDecorator('joinmail', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox value={checkJoin} onChange={onChangeJoinMaillit}>
                加入LSU CSSA邮箱列表,获取以后的活动咨询
              </Checkbox>,
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  );
}

VolunteerForm.propTypes = {
  onSubmitRequest: PropTypes.func,
  onAfterConfirm: PropTypes.func,
  form: PropTypes.object,
};

export default Form.create()(VolunteerForm);
