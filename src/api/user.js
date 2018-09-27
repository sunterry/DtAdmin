import axios from './index';

export const login = params => axios
  .request({
    url: '/admin/login',
    method: 'post',
    data: params,
  });

export const getUserInfo = () => {};
