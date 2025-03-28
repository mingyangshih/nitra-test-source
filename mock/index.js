export default [
  {
    url: "/api/user/info",
    method: "get",
    response: () => {
      return {
        code: 200,
        message: "成功",
        data: {
          id: 1,
          name: "张三",
          age: 25,
        },
      };
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    response: (req) => {
      const { username, password } = req.body;
      if (username === "admin" && password === "123456") {
        return { code: 200, message: "登录成功", token: "fake-jwt-token" };
      }
      return { code: 401, message: "用户名或密码错误" };
    },
  },
];
