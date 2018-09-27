import Mock from 'mockjs'; /* eslint-disable-line */
import { login } from './user';

Mock.mock(/\/admin\/login/, 'post', login);

export default Mock;
