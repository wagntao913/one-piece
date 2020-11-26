import Request from "../utils/request";

export function login(data = {}) {
  return Request({
    url: "/user/login",
    method: "POST",
    data
  });
}

export function getSmsCode() {
  return Request({
    url: "/user/getSmscode",
    method: "GET"
  });
}
