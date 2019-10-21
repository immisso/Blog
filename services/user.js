/*
 * @Author: 柒叶 
 * @Date: 2019-10-21 16:27:48 
 * @Last Modified by: 柒叶
 * @Last Modified time: 2019-10-21 16:29:43
 */

import request from '@/utils/request';

export async function postGetLogin(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function postRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}


export async function postGetUser() {
  return request('/api/user/info');
}

export async function deleteCookie() {
  return request('/api/delCookie');
}
