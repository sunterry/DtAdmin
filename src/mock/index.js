import Mock from 'mockjs'; /* eslint-disable-line */
import { login, getUserInfo } from './user';

Mock.mock(/\/admin\/login/, 'post', login);
Mock.mock(/\/admin\/getUserInfo/, 'post', getUserInfo);

export default Mock;
