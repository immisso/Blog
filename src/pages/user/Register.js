/*
 * @Author: 柒叶
 * @Date: 2019-09-16 10:55:33
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-02 16:48:13
 */

import React, { Component } from 'react';
import { Row, Form, Input, Button, message } from 'antd';

import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';

@connect(({ user }) => ({
  user,
}))
@Form.create()
class Register extends Component {
  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'user/register',
          payload: {
            ...values,
          },
          callback: (res) => {
            if (res && res.error_code === 1000) {
              message.success('注册成功,请登录');
              router.push({ pathname: '/user/login', isRegister: true });
            } else {
              message.error('注册失败，请重新注册');
            }
          },
        });
      }
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    const passwordValidator = (rule, value, callback) => {
      if (value && value !== getFieldValue('password')) {
        callback('两次输入不一致！');
      }
      callback();
    };
    return (
      <div>
        <Row
          type="flex"
          align="middle"
          justify="center"
          className="px-3"
          style={{ minHeight: '100vh', background: '#ddd' }}
        >
          <div style={{ width: 400, padding: '40px', background: '#fff' }}>
            <h3 className="text-center mmb-1 mmt-1">注册</h3>
            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
            >
              <Form.Item>
                {getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                      message: '必须输入昵称',
                    },
                    {
                      min: 2,
                      message: '昵称至少2位字符',
                    },
                    {
                      max: 10,
                      message: '昵称最多10位字符',
                    },
                    {
                      whitespace: true,
                      message: '不能输入空格',
                    },
                  ],
                })(
                  <Input placeholder="请输入昵称" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: '必须输入邮箱',
                    },
                    {
                      max: 64,
                      message: '邮箱不合法',
                    },
                    {
                      pattern: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                      message: '邮箱不合法',
                    },
                    {
                      whitespace: true,
                      message: '不能输入空格',
                    },
                  ],
                })(
                  <Input placeholder="请输入邮箱" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
                    },
                    {
                      min: 8,
                      message: '密码至少8位',
                    },
                    {
                      max: 20,
                      message: '密码最多20位',
                    },
                    {
                      pattern: /^[a-zA-Z0-9_.@#$^&*]+$/,
                      message: '密码只能由字母、数字、下划线、特殊字符（比如@#$.^&*）组成',
                    },
                    {
                      whitespace: true,
                      message: '不能输入空格',
                    },
                  ],
                })(
                  <Input.Password placeholder="请输入密码" />,
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password2', {
                  rules: [
                    {
                      required: true,
                      message: '再次输入密码',
                    },
                    {
                      validator: passwordValidator,
                    },
                  ],
                })(
                  <Input.Password placeholder="再次输入密码" />,
                )}
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block className="mt-10">
										注册
                </Button>
              </Form.Item>
              <Link to="/user/login">
							登陆账户
              </Link>
            </Form>
          </div>
        </Row>
      </div>
    );
  }
}

export default Register;
