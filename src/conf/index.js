/* 开发环境下如果设置了反向代理，那么baseURL为空字符串 */
export const baseURL = process.env.NODE_ENV === 'production' ? 'http' : '';
export const timeOut = 10000;
