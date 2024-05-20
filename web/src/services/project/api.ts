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

export async function countItemLikes(id: string, options?: { [key: string]: any }) {
  return request<Common.Results<number>>('/project/countItemLikes', {
    method: 'POST',
    params: {
      id,
    },
    ...(options || {}),
  });
}

export async function cancelItemLikes(id: string, options?: { [key: string]: any }) {
  return request<Common.Results<number>>('/project/cancelItemLikes', {
    method: 'POST',
    params: {
      id,
    },
    ...(options || {}),
  });
}

export async function countItemCollects(id: string, options?: { [key: string]: any }) {
  return request<Common.Results<number>>('/project/countItemCollects', {
    method: 'POST',
    params: {
      id,
    },
    ...(options || {}),
  });
}

export async function cancelItemCollects(id: string, options?: { [key: string]: any }) {
  return request<Common.Results<number>>('/project/cancelItemCollects', {
    method: 'POST',
    params: {
      id,
    },
    ...(options || {}),
  });
}