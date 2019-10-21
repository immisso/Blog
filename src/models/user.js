/*
 * @Author: 柒叶
 * @Date: 2019-09-08 13:18:56
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 17:46:02
 */
import {
  postGetLogin,
  postRegister,
} from '@/services/user';


export default {
  namespace: 'user',

  state: {
    user: {},
    register: {},
  },

  effects: {
    * login({ payload, callback }, { call, put }) {
      const response = yield call(postGetLogin, payload);
      if (callback) callback(response);
    },
    * register({ payload, callback }, { call, put }) {
      const response = yield call(postRegister, payload);
      if (callback) callback(response);
    },
  },

  reducers: {
    userinfoHandle(state, { payload }) {
      return {
        user: payload,
      };
    },
    saveUser(state, { payload }) {
      return {
        ...state,
        user: payload.user,
      };
    },
    clearUser(state) {
      return {
        ...state,
        user: {},
      };
    },
  },
};
