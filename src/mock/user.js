export const login = (options) => {
  const { body } = options;
  const res = JSON.parse(body);
  let response = null;
  console.log(res);
  if (res.user_name === 'admin' && res.password === '123456a') {
    response = {
      code: 1000,
      message: '登录成功',
      data: {
        token: '123',
      },
    };
  } else {
    response = {
      code: 401,
      message: '登录失败',
      data: {},
    };
  }
  return response;
};

export const getUserInfo = (options) => {
  console.log(options);
};
