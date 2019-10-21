/*
 * @Author: 柒叶
 * @Date: 2019-09-16 10:59:11
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 17:00:04
 */

import React, { Component } from 'react';
import { Button, Row, Form, Input, Checkbox, message } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import storageHelper from '../../utils/storage';
import './Login.less';

@connect(({ user }) => ({
  user,
}))
@Form.create()
class Login extends Component {
  componentDidMount() {
    // 获取用户信息
    const userInfos = storageHelper.get('web_user');
    const expireTime = storageHelper.get('expire');
    if (userInfos && userInfos.user_id && userInfos && moment() < moment(expireTime.expire)) {
      router.push('/');
    }
  }

  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'user/login',
          payload: {
            ...values,
          },
          callback: (res) => {
            if (res.error_code === 1000) {
              message.success('登录成功');
              storageHelper.set('expire', { expire: moment().add(res.data.expire, 's').format('YYYY-MM-DD HH:mm:ss') });
              storageHelper.set('web_user', res.data);
              if (this.props.location.isRegister) {
                router.push('/');
              } else {
                router.goBack();
              }
            } else {
              message.error('登录失败，请重新登录');
              router.push('/user/login');
            }
          },
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row
          type="flex"
          align="middle"
          justify="center"
          className="px-3"
          style={{ minHeight: '100vh', background: '#ddd' }}
        >
          <div className="login-main">
            <h3 className="text-center mbb-1 mmt-1">登录</h3>
            <Form layout="vertical" onSubmit={this.handleSubmit}>
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
                  ],
                })(
                  <Input placeholder="邮箱：qiye@test.com" />,
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
                  ],
                })(
                  <Input.Password placeholder="密码：qiye123456" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>自动登陆</Checkbox>)}
                <a className="login-form-forgot fr" href="/">
                    忘记密码？
                </a>
                <Button type="primary" htmlType="submit" block className="mt-20">
                    登陆
                </Button>
              </Form.Item>
              <Link to="/user/register">
                注册账户
              </Link>
            </Form>
          </div>
        </Row>
      </div>
    );
  }
}

export default Login;
