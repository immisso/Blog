/*
 * @Author: 柒叶
 * @Date: 2019-09-08 10:13:54
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 15:44:31
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Empty,
  Row,
  Col,
} from 'antd';
import HomeLeftSiderBar from '../../components/HomeLeftSiderBar';
import SiderList from '../../components/SiderList';
import HomeArticleList from '../../components/HomeArticleList';
import './home.less';

@connect(({ article, loading }) => ({
  article, loading: loading.effects['article/articleList'],
}))
class Home extends Component {
  state={
    currentCategory: null,
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/articleList',
    });
    dispatch({
      type: 'article/hot',
    });
    dispatch({
      type: 'article/category',
    });
  }

  render() {
    const {
      article: { articleList, hotList, categorys, isEmptyList },
      loading,
    } = this.props;
    return (
      <div style={{ padding: '1.5rem' }}>
        <Row type="flex" justify="center">
          <Col md={19} sm={20} xs={24}>
            <Row type="flex" justify="space-between">
              <Col lg={3} sm={7} xs={0}>
                <HomeLeftSiderBar
                  categorys={categorys}
                  loading={loading}
                />
              </Col>
              <Col lg={16} sm={16} xs={24}>
                <Card
                  bordered={false}
                  loading={loading}
                >
                  {!isEmptyList ? (
                    <HomeArticleList
                      data={articleList}
                    />
                  ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </Card>
              </Col>
              <Col lg={4} sm={0} xs={0}>
                <Card
                  size="small"
                  bordered={false}
                  title="热门文章"
                  loading={loading}
                >
                  <SiderList
                    dataSource={hotList}
                    bordered={false}
                    size="small"
                    split={false}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
