/*
 * @Author: 柒叶
 * @Date: 2019-09-22 12:58:36
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-17 13:49:39
 */

import React, { Component } from 'react';
import { Comment, Input, Button, Tooltip, List } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import UserAvatar from './common/UserAvatar';

import './styles/Comment.less';


moment.locale('zh-cn');
const Content = ({ content }) => (
  <p>
    {content}
  </p>
);

const Datetime = ({ time }) => {
  return (
    <Tooltip
      title={time}
    >
      <span>
        {moment(time).fromNow()}
      </span>
    </Tooltip>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <div style={{ marginBottom: 10 }}>
      <Input.TextArea rows={2} onChange={onChange} value={value} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ opacity: 0 }}><span>表情</span></div>
      <div>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          评论
        </Button>
      </div>
    </div>
  </div>
);

@connect(({ article, user }) => ({
  article,
  user,
}))
class AddComment extends Component {
  state = {
    content: '',
  }

  componentDidMount() {
    const { dispatch, articleId } = this.props;
    if (articleId) {
      dispatch({
        type: 'article/commentList',
        payload: {
          articleId,
        },
      });
    }
  }

  handleChange=(e) => {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit=() => {
    const { dispatch, articleId, user: { user } } = this.props;
    if (this.state.content) {
      dispatch({
        type: 'article/comment',
        payload: {
          content: this.state.content,
          articleId,
        },
        callback: (res) => {
          if (res.error_code === 1000) {
            dispatch({
              type: 'article/commentHandle',
              payload: { ...res.data, user },
            });
            this.setState({ content: '' });
          }
        },
      });
    }
  }

  render() {
    const { content } = this.state;
    const { user: { user }, article: { comments } } = this.props;
    return (
      <>
        <Comment
          avatar={
            user && user.user_id && <UserAvatar src={user.avatar} />}
          content={
            user && user.user_id
              ? (
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  value={content}
                />
              )
              : (
                <Link to="/user/login">登录后可评论</Link>
              )
          }
        />
        <List
          className="comment-list"
          itemLayout="horizontal"
          split={false}
          dataSource={comments}
          renderItem={item => (
            <List.Item>
              <Comment
                author={item.user.nickname}
                avatar={item.user.avatar}
                content={<Content content={item.content} />}
                datetime={<Datetime time={item.create_time} />}
              />
            </List.Item>
          )}
        />,
      </>
    );
  }
}

export default AddComment;
