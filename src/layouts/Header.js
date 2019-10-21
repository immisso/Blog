/*
 * @Author: 柒叶
 * @Date: 2019-09-08 21:45:31
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 17:05:48
 */

import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import { connect } from 'dva';
import UserAvatar from '../components/common/UserAvatar';
import storageHelper from '../utils/storage';
import './Header.less';

const { Header } = Layout;
const { SubMenu } = Menu;
const tabs = [
  {
    title: '文章',
    category: 'article',
  },
  {
    title: '教程',
    category: 'course',
  },
];
@connect(({ user }) => ({
  user,
}))
class MainHeader extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const userInfos = storageHelper.get('web_user');
    const expireTime = storageHelper.get('expire');
    console.log('000000000eeeeeeeeeeeeeeeeeee')
    console.log(userInfos);
    console.log(expireTime);
    if (userInfos && moment() < moment(expireTime.expire)) {
      dispatch({
        type: 'user/saveUser',
        payload: {
          user: userInfos,
        },
      });
    }
  }

  logout=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/clearUser',
    });
    storageHelper.clear('expire');
    storageHelper.clear('web_user');
  }

  render () {
    const { user: { user } } = this.props;
    return (
      <Header className="main-header">
        <div className="main-header-left">
          <Link to="/" className="brand">
            <svg className="icon" width="48px" height="20.76px" viewBox="0 0 2368 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#007bff" d="M809.325319 891.7236a3496.102927 3496.102927 0 0 0 785.32915-185.623254c220.526772-81.705962 426.774831-189.589563 607.241884-342.490768a1398.917128 1398.917128 0 0 0 165.196763-165.593394 171.146226 171.146226 0 0 0-59.494633-32.523732A2277.057905 2277.057905 0 0 0 1742.201158 16.954185a1800.307583 1800.307583 0 0 0-663.166838 31.928787C713.142329 138.124921 420.825368 341.001618 184.433361 629.947217c-3.173047 3.966309-7.932618 7.734302-2.578101 13.48545C606.646937 319.980181 1163.120067 253.941139 1478.044989 291.621073c-4.759571 10.312403-14.675343 8.725879-23.202906 9.519141a2181.469862 2181.469862 0 0 0-272.683733 46.207498c-274.071941 61.081156-535.451693 156.669199-773.430224 306.992304A1488.952339 1488.952339 0 0 0 0.396631 1024c126.921883-68.022197 263.759538-92.811627 403.571924-100.149298 135.449447-7.535987 270.700578-15.270289 405.356764-32.127102z" /></svg>
          </Link>
          <Menu mode="horizontal">
            {tabs.map(item => (
              <Menu.Item key={item.category}>
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="main-header-right">
          {
            user && user.user_id
              ? (
                // <span>{user.nickname}</span>
                <Menu onClick={this.handleClick} mode="horizontal">
                    <SubMenu
                      title={
                        <UserAvatar src={user.avatar} />
                    }
                    >
                      <Menu.Item key="setting:1">写文章</Menu.Item>
                      <Menu.Item key="setting:2">草稿</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="setting:3">个人中心</Menu.Item>
                      <Menu.Item key="setting:4">设置</Menu.Item>
                      <Menu.Item key="setting:5">主题</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item key="setting:6" onClick={this.logout}>退出</Menu.Item>
                    </SubMenu>
                </Menu>
              )
              : (
                <span>
                  <Link to="/user/login">登录</Link>
                  <span style={{ padding: 10 }}>·</span>
                  <Link to="/user/register">注册</Link>
                </span>
              )
          }
        </div>
      </Header>
    );
  }
}

export default MainHeader;
