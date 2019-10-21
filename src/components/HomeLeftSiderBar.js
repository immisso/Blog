/*
 * @Author: 柒叶
 * @Date: 2019-09-23 09:48:49
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-02 16:29:07
 */

import React from 'react';
import { Card, Menu, Divider } from 'antd';

const HomeLeftSiderBar = props => (
  <Card
    loading={props.loading}
    size="small"
    bordered={false}
    bodyStyle={{ padding: 0 }}
  >
    <div>
      <Divider orientation="left">
        <small>技术</small>
      </Divider>
      <Menu className="mbb-1 br-0" onClick={props.onClickItem}>
        {props.categorys && props.categorys.map((item) => {
          return (
            <Menu.Item key={item.category_id}>
              {item.category_name}
            </Menu.Item>
          );
        })}
        {/* <Menu.Item key="2">Python</Menu.Item>
          <Menu.Item key="3">算法</Menu.Item>
          <Menu.Item key="4">Go</Menu.Item>
          <Menu.Item key="5">Rust</Menu.Item>
          <Divider orientation="left">
            <small>生活</small>
          </Divider>
          <Menu.Item key="6">阅读</Menu.Item>
          <Menu.Item key="7">散文</Menu.Item>
          <Menu.Item key="8">日记</Menu.Item>
          <Menu.Item key="9">随笔</Menu.Item>
          <Menu.Item key="10">旅游</Menu.Item> */}
      </Menu>
    </div>
  </Card>
);


export default HomeLeftSiderBar;
