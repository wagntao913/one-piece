import axios from "axios";
import { Toast } from "vant";

let Request = axios.create({
	baseURL: "",
	timeout: 1000
});

Request.interceptors.request.use(
	config => {
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

Request.interceptors.response.use(
	response => {
		if (response.status === 200) {
			if (response.data.code === "999999") {
				console.log(response);
				Toast(response.data.message);
				return Promise.reject(response);
			} else if (response.data.code === "000000") {
				return Promise.resolve(response.data.result);
			}
		}
	},
	err => {
		// 异常处理
		Toast("超时或者服务器异常，请稍后重试！");
		return Promise.reject(err);
	}
);

export default Request;
