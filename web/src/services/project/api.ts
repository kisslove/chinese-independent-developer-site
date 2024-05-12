
import { request } from '@umijs/max';

export async function getList(params: Common.Query, options?: { [key: string]: any }) {
  return request<Project.Res>('/project/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getItemDetails(id: string, options?: { [key: string]: any }) {
  return request<Project.ItemOtherDetails>('/project/findItemDetails', {
    method: 'GET',
    params: {
      id,
    },
    ...(options || {}),
  });
}


export async function countItemViews(id: string, options?: { [key: string]: any }) {
  return request<Common.Results<number>>('/project/countItemViews', {
    method: 'POST',
    params: {
      id,
    },
    ...(options || {}),
  });
}

