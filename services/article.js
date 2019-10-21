/*
 * @Author: 柒叶 
 * @Date: 2019-10-09 14:14:18 
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 15:54:08
 */

import { stringify } from 'qs'
import request from '@/utils/request'

// 获取文章列表
export async function getArticleList() {
  return request('/api/article/list')
}

// 获取热门文章
export async function getHotArticle() {
  return request('/api/article/hot');
}

// 获取分类列表
export async function getCategory() {
  return request('/api/article/category');
}

// 获取文章详情(通过id)

export async function getArticleDetail(params) {
  return request(`/api/article/detail?${stringify(params)}`);
}