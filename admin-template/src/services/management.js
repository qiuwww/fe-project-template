import request from '@/utils/request';
import { stringify } from 'qs';

export async function enumStatus(payload) {
  return request('/api/enum/status');
}
export async function fetchMovieList(payload) {
  const { params, pagination } = payload;
  console.log('payload', payload);
  return request(`/api/movie/list?${stringify(pagination)}`, {
    method: 'POST',
    body: params,
  });
}
