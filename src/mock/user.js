export const login = (options) => {
  const { body } = options;
  const res = JSON.parse(body);
  let response = null;
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
  const { body } = options;
  const res = JSON.parse(body);
  let response = null;
  if (res.token) {
    response = {
      code: 1000,
      data: {
        user: {
          user_name: 'admin',
          avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
          token: res.token,
        },
        auth: [
          { scenic: true },
          { goods: true },
          { role: false },
        ],
      },
      message: '获取用户信息成功',
    };
  } else {
    response = {
      code: 1001,
      data: {},
      message: '用户token不存在',
    };
  }
  return response;
};
