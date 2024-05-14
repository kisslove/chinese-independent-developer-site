
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


export async function userLogin(data: User.UserLogin, options?: { [key: string]: any }): Promise<User.Item> {
  return request<User.Item>('/user/login', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

export async function userRegister(data: User.Item, options?: { [key: string]: any }): Promise<User.Item> {
  return request<User.Item>('/user/register', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

