/**
 *
 * RequestForm
 *
 */

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import {
  Row,
  Col,
  Form,
  Radio,
  Tooltip,
  Input,
  DatePicker,
  Icon,
  Select,
  Button,
  Checkbox,
  TimePicker,
} from 'antd';
import { Link } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
let otherAirport = '';
let checkJoin = false;

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

function RequestForm({ form, onSubmitRequest, onAfterConfirm }) {
  const { getFieldDecorator } = form;

  const handelSubmitRequest = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        onSubmitRequest(fieldsValue, onAfterConfirm);
      }
    });
  };
  const onChangeAirport = e => {
    otherAirport = e.target.value;
  };

  const onChangeJoinMaillit = e => {
    checkJoin = e.target.checked;
  };
  const checkDate = (rule, value, callback) => {
    if (value.isBefore(new Date(new Date().toDateString()))) {
      callback('时光不能倒转, 请选择今天或者未来日期');
    } else {
      callback();
    }
  };
  const checkTime = (rule, value, callback) => {
    const userSelectDate = form.getFieldValue('date').startOf('day');
    const todayWithoutTime = new Date(new Date().toDateString());
    const twoHourAfter = new Date().setHours(new Date().getHours() + 2);
    if (
      userSelectDate.isSame(todayWithoutTime) &&
      value.isBefore(twoHourAfter)
    ) {
      callback('至少两小时前');
    } else {
      callback();
    }
  };
  return (
    <Row justify="start">
      <Col span={12} offset={5}>
        <Form layout="horizontal" onSubmit={handelSubmitRequest}>
          <FormItem {...formItemLayout} label="" />
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
                <Radio value="male">男</Radio>
                <Radio value="female">女</Radio>
                <Radio value="guess">?.？</Radio>
              </RadioGroup>,
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="来自">
            {getFieldDecorator('hometown', {})(<Input />)}
          </FormItem>

          <FormItem {...formItemLayout} label="毕业学校">
            {getFieldDecorator('school', {
              rules: [{ required: true, message: '(ಥ_ಥ)', whitespace: true }],
            })(<Input />)}
          </FormItem>
          <FormItem {...radioGroupLayout} label="攻读学位">
            {getFieldDecorator('degree', {
              rules: [{ required: true, message: 'ჰჰჰ❛‿❛ჴჴჴ' }],
            })(
              <RadioGroup>
                <Radio value="bachelor">本科</Radio>
                <Radio value="master">硕士</Radio>
                <Radio value="phd">博士</Radio>
                <Radio value="visitor">访问学者</Radio>
                <Radio value="other">其他</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem
            labelCol={{
              xs: { span: 10 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              sm: { span: 8 },
              md: { span: 7 },
            }}
            label="到达日期"
            extra="美国中部时间"
          >
            {getFieldDecorator('date', {
              rules: [
                { type: 'object', required: true, message: 'ｄ(･∀･*)♪ﾟ' },
                {
                  validator: checkDate,
                },
              ],
            })(<DatePicker />)}
          </FormItem>

          <FormItem
            labelCol={{
              xs: { span: 10 },
              sm: { span: 8 },
            }}
            wrapperCol={{
              xs: { span: 15 },
              sm: { span: 10 },
            }}
            label="到达时间"
            extra="美国中部时间"
          >
            {getFieldDecorator('time', {
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: '差不多时间就行了',
                },
                {
                  validator: checkTime,
                },
              ],
            })(<TimePicker format="HH:mm" />)}
          </FormItem>
          <FormItem {...radioGroupLayout} label="到达机场">
            {getFieldDecorator('airport', {
              rules: [{ required: true, message: '🀅🀅🀅' }],
            })(
              <RadioGroup onChange={onChangeAirport}>
                <Radio value="Baton Rouge/BTR">Baton Rouge/巴吞鲁日/BTR</Radio>
                <Radio value="New Orleans/MSY">New Orleans/新奥尔良/MSY</Radio>
                <Radio value="other">其他(请注明)</Radio>
              </RadioGroup>,
            )}
          </FormItem>

          {otherAirport === 'other' ? (
            <FormItem
              wrapperCol={{
                xs: { span: 10 },
                sm: { span: 10, offset: 8 },
              }}
            >
              {getFieldDecorator('otherAirport', {
                rules: [{ required: true, message: '!?(･_･;?' }],
              })(<TextArea placeholder="按快车键可以多行~" autosize />)}
            </FormItem>
          ) : null}

          <FormItem {...radioGroupLayout} label="行李箱数量">
            {getFieldDecorator('luggage', { initialValue: '无' })(
              <RadioGroup>
                <Radio value="0">0</Radio>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3+">大于3件</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem {...radioGroupLayout} label="同行伙伴">
            {getFieldDecorator('friends', { initialValue: '无' })(
              <RadioGroup>
                <Radio value="0">0</Radio>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3+">大于3人</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem
            {...radioGroupLayout}
            label={
              <span>
                需要临时住宿?&nbsp;
                <Tooltip title="推荐提前联系, 如果仍没有找到合适临时住宿, ICC有提供临时住宿, 先到先得">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('sleep', {
              rules: [{ required: true, message: '(;ﾟ∀ﾟ)=3ﾊｧﾊｧ' }],
            })(
              <RadioGroup>
                <Radio value="yes">是</Radio>
                <Radio value="no">否</Radio>
              </RadioGroup>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话">
            {getFieldDecorator('phone', { initialValue: '无' })(
              <Input
                addonBefore={getFieldDecorator('prefix', {
                  initialValue: '1',
                })(
                  <Select style={{ width: 70 }}>
                    <Option value="86">+86</Option>
                    <Option value="1">+1</Option>
                  </Select>,
                )}
                style={{ width: '100%' }}
              />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                社交平台&nbsp;
                <Tooltip title="微信,QQ等等">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('social', {})(
              <Input placeholder="请留下至少一种联系方式" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                想对志愿者说&nbsp;
                <Tooltip title="会公开的哟~">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('toVolunteer', {})(
              <TextArea rows={4} placeholder="说不定可以增加匹配的成功率!" />,
            )}
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
            // wrapperCol={{
            //   xs: { span: 24, offset: 8 },
            //   sm: { span: 24, offset: 8 },
            // }}
          >
            {getFieldDecorator('joinmail', {
              valuePropName: 'checked',
            })(
              <Checkbox value={checkJoin} onChange={onChangeJoinMaillit}>
                加入LSU CSSA邮箱列表,获取以后的活动咨询
              </Checkbox>,
            )}
          </FormItem>
          {/* <FormItem
            {...formItemLayout}
            label="验证码"
            // hasFeedback
            validateStatus={this.state.captcha.validateStatus}
            help={this.state.captcha.errorMsg}
            required={true}
          >
            {getFieldDecorator('captcha', {
              // validateTrigger: 'onClick',
              rules: [{ required: true, message: '互相确认下眼神' }],
            })(
              <Row gutter={8}>
                <Col span={12}>
                  <Input
                    value={this.state.captcha.value}
                    onChange={this.handleCaptchaChange}
                    placeholder="大小写均可"
                  />
                </Col>
              </Row>,
            )}
            <Captcha captcha={this.getCaptcha} />
          </FormItem> */}
          <FormItem {...tailFormItemLayout}>
            <Row>
              <Col span={2}>
                <Link to="/">
                  <Button>取消</Button>
                </Link>
              </Col>
              <Col span={2} offset={8}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Col>
    </Row>
  );
}

RequestForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmitRequest: PropTypes.func,
  onAfterConfirm: PropTypes.func,
  // onChangeAirport: PropTypes.func.isRequired,
  // otherAirport: PropTypes.string.isRequired,
};

export default Form.create()(RequestForm);
