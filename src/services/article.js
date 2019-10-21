import { stringify } from 'qs';
import request from '@/utils/request';

// 获取文章列表

export async function getArticleList(params) {
  return request(`/api/article/list?${stringify(params)}`);
}


// 获取文章详情(通过id)

export async function getArticleDetail(params) {
  return request(`/api/article/detail?${stringify(params)}`);
}

// 给文章添加评论

export async function postArticleComment(params) {
  return request('/api/article/comment', {
    method: 'POST',
    data: params,
  });
}

// 获取文章评论列表
export async function getArticleComment(params) {
  return request(`/api/article/comment/list?${stringify(params)}`);
}

// 获取热门文章
export async function getHotArticle() {
  return request('/api/article/hot');
}

// 获取分类列表

export async function getCategory() {
  return request('/api/article/category');
}
