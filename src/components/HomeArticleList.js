/*
 * @Author: 柒叶
 * @Date: 2019-09-23 13:26:38
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-02 16:23:01
 */

import React from 'react';
import { Timeline, Icon, Tooltip } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import UserAvatar from './common/UserAvatar';

moment.locale('zh-cn');

const HomeArticleList = props => (
  <>
    <Timeline className="mp-1">
      {props.data.map(item => (
        <Timeline.Item
          key={item.article_id}
          dot={
            item.user && item.user.avatar
              && <UserAvatar src={item.user.avatar} />
          }
        >
          <div className="mml-15">
            <Link to={`/article/${item.article_id}`} target="_block">
              <h3 className="fw-700 ft-16">
                {item.title}
              </h3>
            </Link>
            <div className="ft-13">
              <span>{item.user && item.user.nickname}&nbsp;·&nbsp;</span>
              <span>
                <Tooltip title={item.create_time}>{moment(item.create_time).fromNow()}</Tooltip>
                &nbsp;·&nbsp;
              </span>
              <span>{item.category && item.category.category_name}&nbsp;&nbsp;</span>
            </div>
            <div className="mtb-10 ft-13">{item.abstract}</div>
            <div className="ft-13">
              <span>
                <Icon
                  type="like"
                  theme="outlined"
                />
                <span className="pointer pl-5">{item.like_num}</span>
              </span>
              <span className="ml-10">
                <Icon
                  type="eye"
                  theme="outlined"
                />
                <span className="pointer pl-5">{item.view_num}</span>
              </span>
              <span className="ml-10">
                <Icon
                  type="message"
                  theme="outlined"
                />
                <span className="pointer pl-5">{item.comment_num}</span>
              </span>
            </div>
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  </>
);

export default HomeArticleList;
