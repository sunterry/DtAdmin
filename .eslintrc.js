module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off', // 关闭禁止给变量赋值
    radix: 'off', // 关闭parseInt必须填写第二个参数
    'no-plusplus': 'off', // 关闭eslint禁止 ++ -- 的写法
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
