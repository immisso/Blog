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

export async function deleteCookie() {
  return request('/api/delCookie');
}
