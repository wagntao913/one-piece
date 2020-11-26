import Mock from "mockjs";
import md5 from "js-md5";
import { builder } from "./utils";
import { randomWord } from "@/utils";
// import { PasswordInput } from "vant";
// const Random = Mock.Random;

const username = ["admin", "super"];
const password = [md5("123456"), md5("000000")];
let smsCode = "";

const login = options => {
  console.log(options);
  const resquestBody = options.body && JSON.parse(options.body);
  if (
    !username.includes(resquestBody.username) ||
    !password.includes(resquestBody.password)
  ) {
    return builder({}, "用户名或密码错误", "999999");
  } else if (smsCode.toUpperCase() !== resquestBody.smsCode.toUpperCase()) {
    return builder({}, "验证码错误", "999999");
  }
  return builder(
    {
      id: Mock.mock("@guid"),
      name: Mock.mock("@name"),
      message: "登录成功"
    },
    "success",
    "000000"
  );
};

const getSmscode = () => {
  smsCode = randomWord(true, 5, 5);
  return builder({ smsCode }, "获取验证码成功", "000000");
};

Mock.mock("/user/login", "post", login);
Mock.mock("/user/getSmscode", "get", getSmscode);
