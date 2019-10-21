/*
 * @Author: 柒叶
 * @Date: 2019-09-22 22:03:45
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-03 17:06:06
 */
import React, { Component } from 'react';
import { Anchor } from 'antd';


class ArticleAnchor extends Component {
  anchorRender=(data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <Anchor.Link key={`${item.tag}-${item.title}`} href={`#${item.href}`} title={item.title} className={item.ismain ? 'bold' : ''}>
            { this.anchorRender(item.children) }
          </Anchor.Link>
        );
      }
      return <Anchor.Link key={`${item.tag}-${item.title}`} href={`#${item.href}`} title={item.title} className={item.ismain ? 'bold' : ''} />;
    });
  }

  render() {
    return (
      <>
        <Anchor
          style={{ marginTop: 10, background: 'none', marginLeft: 0 }}
          showInkInFixed
        >
          {this.anchorRender(this.props.anchors)}
        </Anchor>
      </>
    );
  }
}

export default ArticleAnchor;
