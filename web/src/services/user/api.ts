
import { request } from '@umijs/max';

export async function getList(params: Common.Query, options?: { [key: string]: any }) {
  return request<User.Res>('/user/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getUserSocials(id: string, options?: { [key: string]: any }) {
  return request<User.ItemSocials>('/user/getUserSocials', {
    method: 'GET',
    params: {
      id,
    },
    ...(options || {}),
  });
}

