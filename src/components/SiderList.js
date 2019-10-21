/*
 * @Author: 柒叶
 * @Date: 2019-09-23 13:11:12
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-02 16:37:14
 */

import React from 'react';
import { List, Icon } from 'antd';
import Link from 'umi/link';


const SiderList = props => (
  <List
    itemLayout="vertical"
    dataSource={props.dataSource}
    bordered={props.bordered}
    size={props.size}
    split={props.split}
    renderItem={item => (
      <List.Item
        actions={[
          <span>
            <Icon
              type="eye"
              theme="outlined"
            />
            <span className="pl-5 pointer">{item.view_num}</span>
          </span>,
        ]}
      >
        <Link to={`/article/${item.article_id}`} style={{ color: '#000000a6' }} target="_block">{item.title}</Link>
      </List.Item>
    )}
  />
);

export default SiderList;
