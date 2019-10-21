/*
 * @Author: 柒叶
 * @Date: 2019-09-14 09:34:20
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 17:37:12
 */

import {
  getArticleList,
  getArticleDetail,
  postArticleComment,
  getArticleComment,
  getHotArticle,
  getCategory,
} from '@/services/article';


export default {
  namespace: 'article',

  state: {
    article: {},
    articleList: [],
    hotList: [],
    comments: [],
    categorys: [],
    isEmptyList: false,
  },

  effects: {
    * articleList({ payload }, { call, put }) {
      const response = yield call(getArticleList, payload);
      yield put({
        type: 'articleListHandle',
        payload: response,
      });
    },
    * articleDetail({ payload }, { call, put }) {
      const response = yield call(getArticleDetail, payload);
      yield put({
        type: 'articleDetailHandle',
        payload: response,
      });
    },
    * comment({ payload, callback }, { call, put }) {
      const response = yield call(postArticleComment, payload);
      if (callback) callback(response);
    },
    * commentList({ payload }, { call, put }) {
      const response = yield call(getArticleComment, payload);
      yield put({
        type: 'commentListHandle',
        payload: response,
      });
    },
    * hot({ payload }, { call, put }) {
      const response = yield call(getHotArticle, payload);
      yield put({
        type: 'hotHandle',
        payload: response,
      });
    },
    * category({ payload }, { call, put }) {
      const response = yield call(getCategory, payload);
      yield put({
        type: 'categoryHandle',
        payload: response,
      });
    },
  },

  reducers: {
    articleListHandle(state, { payload }) {
      return {
        ...state,
        articleList: payload.data ? [...payload.data] : [],
        isEmptyList: payload.data && payload.data.length === 0,
      };
    },
    articleDetailHandle(state, { payload }) {
      return {
        ...state,
        article: payload ? payload : {},
      };
    },
    commentHandle(state, { payload }) {
      return {
        ...state,
        comments: [payload, ...state.comments],
      };
    },
    commentListHandle(state, { payload }) {
      return {
        ...state,
        comments: [...payload],
      };
    },
    hotHandle(state, { payload }) {
      return {
        ...state,
        hotList: payload.data ? payload.data : [],
      };
    },
    categoryHandle(state, { payload }) {
      return {
        ...state,
        categorys: payload.data ? payload.data : [],
      };
    },
  },
};
