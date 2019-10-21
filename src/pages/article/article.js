/*
 * @Author: 柒叶
 * @Date: 2019-09-13 09:21:21
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 17:38:46
 */
import React, { Component } from 'react';
import {
  Col,
  List,
  Row,
  Card,
  Icon,
  Tooltip,
  Divider,
} from 'antd';
import { ThumbsUp, MessageSquare } from 'react-feather';
import Link from 'umi/link';
import router from 'umi/router';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import moment from 'moment';
import marked from 'marked';
// import hljs from 'highlight.js';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import less from 'highlight.js/lib/languages/less';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';
import cpp from 'highlight.js/lib/languages/cpp';
import nginx from 'highlight.js/lib/languages/nginx';
import shell from 'highlight.js/lib/languages/shell';


import ArticleAnchor from '../../components/Anchor';
import UserAvatar from '../../components/common/UserAvatar';
import AddComment from '../../components/Comment';
import './article.less';
import './markdown-github.css';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('less', less);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);
hljs.registerLanguage('php', php);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('shell', shell);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1439645_kzb7blmpkvc.js',
});


// const AddComment = React.lazy(() => import('../../components/Comment'));

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  headerPrefix: 'qiye',
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});

const createMarkup = (body) => {
  return { __html: body };
};

@connect(({ article, loading }) => ({
  article, loading: loading.effects['article/articleDetail'],
}))
class Article extends Component {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch({
      type: 'article/articleDetail',
      payload: {
        articleId: id,
      },
    });
    dispatch({
      type: 'article/hot',
    });
  }

  handleLike=() => {
    // 点赞的操作
  }

  render () {
    const {
      article: { article, hotList },
      match: { params: { id } }, loading } = this.props;
    if (!article) {
      return <Redirect to="/404" />;
    }
     // const markdownHtml = marked(article.content_mark || '');//如果文章内容是markdown，先转换
    const markdownHtml = article.content_html || '';
    const anchors = JSON.parse(article.anchor || '[]');
    return (
      <div style={{ marginTop: '1.5rem' }}>
        <Row type="flex" justify="center">
          <Col md={16} sm={20} xs={23}>
            <Row type="flex" justify="space-around">
              <Col lg={17} sm={22} xs={24}>
                <Card
                  bordered={false}
                  loading={loading}
                  style={{ padding: '1rem' }}
                >
                  <div className="article-content-main">
                    <div className="py-3">
                      <div className="mmb-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}>
                          { article && article.user && article.user.avatar
                            && <UserAvatar src={article.user.avatar} />
                          }
                          <div className="pl-3">
                            <h4 style={{ marginBottom: 0, fontWeight: 700 }}>
                              {article.user && article.user.nickname}
                            </h4>
                            <small>
                              {moment(article.create_time).format('LL')}
                              <span style={{ marginLeft: 10 }}>{article.view_num}浏览</span>
                            </small>
                          </div>
                        </div>
                      </div>
                      <h2 className="my-4" style={{ fontWeight: 700 }}>{article.title}</h2>
                      <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={createMarkup(markdownHtml)}
                      />

                    </div>
                  </div>
                </Card>
                <Card
                  title="评论"
                  bordered={false}
                  loading={loading}
                  style={{ marginTop: 20, marginBottom: 20 }}
                >
                  <AddComment articleId={id} />
                </Card>
              </Col>
              <Col lg={6} sm={0} xs={0}>
                <Card
                  title="关于作者"
                  bordered={false}
                  size="small"
                  loading={loading}
                >
                  <div style={{ display: 'flex', marginBottom: 20 }}>
                    { article && article.user && article.user.avatar
                       && <UserAvatar src={article.user.avatar} />
                     }
                    <div className="pl-3">
                      <h5>{article.user && article.user.nickname}</h5>
                      <small>
                        {article.user && article.user.profession}
                      </small>
                    </div>
                  </div>
                  <Row
                    className="text-center"
                    type="flex"
                    align="middle"
                    justify="space-between"
                  >
                    <Col span={8}>
                      <h2 className="m-0">
                        <b>{article.user && article.user.total_view}</b>
                      </h2>
                      <small>浏览</small>
                    </Col>
                    <Col span={8}>
                      <h2 className="m-0">
                        <b>{article.user && article.user.total_like}</b>
                      </h2>
                      <small>点赞</small>
                    </Col>
                    <Col span={8}>
                      <h2 className="m-0">
                        <b>{article.user && article.user.total_comment}</b>
                      </h2>
                      <small>评论</small>
                    </Col>
                  </Row>
                  <Divider dashed style={{ marginBottom: 0 }} />
                  <div style={{ marginLeft: 10, fontSize: 16, marginTop: 10 }}>
                    <Tooltip title="https://www.immisso.com">
                      <a href="https://www.immisso.com" style={{ marginRight: 10 }}><Icon type="global" /></a>
                    </Tooltip>
                    <Tooltip title="https://github.com/immisso">
                      <a href="https://github.com/immisso" style={{ marginRight: 10 }}><Icon type="github" /></a>
                    </Tooltip>
                    <Tooltip title="微博">
                      <a href="/"><Icon type="weibo-circle" style={{ marginRight: 10 }} /></a>
                    </Tooltip>
                    <Tooltip title="https://gitee.com/misso">
                      <a href="https://gitee.com/misso"><IconFont type="icon-gitee" /></a>
                    </Tooltip>
                  </div>
                </Card>
                <Card
                  title="相关文章"
                  size="small"
                  bordered={false}
                  loading={loading}
                  style={{ marginTop: 20 }}
                >
                  <List
                    itemLayout="vertical"
                    dataSource={hotList}
                    bordered={false}
                    size="small"
                    split={false}
                    renderItem={item => (
                      <List.Item
                        actions={[
                          <span>
                            <Icon
                              type="eye"
                              theme="outlined"
                              onClick={this.like}
                            />
                            <span style={{ paddingLeft: 2, cursor: 'auto' }}>{item.view_num}</span>
                          </span>,
                        ]}
                      >
                        <Link to={`/article/${item.article_id}`} target="_block" style={{ color: '#000000a6' }}>{item.title}</Link>
                      </List.Item>
                    )}
                  />
                </Card>
                <ArticleAnchor anchors={anchors} />
              </Col>
            </Row>
            <div className="article-panel">
              <div className="article-panel-item">
                <div className="article-panel-icon">
                  <ThumbsUp color={article.isLike ? '#007bff' : '#ccc'} onClick={this.handleLike} />
                </div>
                <div className="article-panel-count">
                  <span>{article.likeNum}</span>
                </div>
              </div>
              <div className="article-panel-item">
                <div className="article-panel-icon">
                  <MessageSquare color="#ccc" />
                </div>
                <div className="article-panel-count">
                  <span>{article.commentNum}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Article;
