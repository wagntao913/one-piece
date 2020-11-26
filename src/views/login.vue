<template>
	<div class="logo-content">
		<van-image
			round
			width="100px"
			height="100px"
			src="https://img.yzcdn.cn/vant/cat.jpeg"
		/>
	</div>
	<div class="login-content">
		<van-field
			border
			clearable
			v-model="username"
			placeholder="请输入用户名"
			label="用户名"
		/>
		<van-field
			border
			clearable
			:type="inputType"
			v-model="password"
			placeholder="请输入密码"
			label="密码"
			:right-icon="rightIcon"
			@click-right-icon="rightClick"
		/>
		<van-field
			v-model="smsCode"
			center
			clearable
			label="验证码"
			placeholder="请输入验证码"
		>
			<template v-slot:extra>
				<verfication-code :width="100"></verfication-code>
			</template>
		</van-field>
		<van-button
			:loading="btnLoading"
			class="login-button"
			type="primary"
			@click="loginClick()"
			block
			>登录</van-button
		>
	</div>
</template>

<script>
import md5 from "js-md5";

import VerficationCode from "@/components/VerficationCode";

import { computed, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { login } from "@/api";

export default {
	name: "login",
	components: {
		VerficationCode
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			username: "",
			password: "",
			smsCode: "",
			receiveCode: "",
			btnLoading: false,
			showPassword: false
		});

		const inputType = computed(() =>
			state.showPassword ? "text" : "password"
		);

		const rightIcon = computed(() =>
			state.showPassword ? "eye-o" : "closed-eye"
		);

		const rightClick = () => {
			state.showPassword = !state.showPassword;
		};
		const loginClick = () => {
			if (!state.username || !state.password) {
				Toast("请输入用户名/密码！");
				return;
			} else if (!state.smsCode) {
				Toast("请输入验证码！");
				return;
			}
			state.btnLoading = true;
			const params = {
				username: state.username,
				password: md5(state.password),
				smsCode: state.smsCode
			};
			login(params)
				.then(res => {
					console.log(res);
					if (res) {
						Toast(res.message);
						router.push({ path: "/home" });
					}
				})
				.catch(err => {
					console.log(err);
					state.btnLoading = false;
				});
		};

		return {
			...toRefs(state),
			inputType,
			rightIcon,
			loginClick,
			rightClick
		};
	}
};
</script>

<style lang="scss">
.logo-content,
.login-content {
	margin-top: 50px;
}
.login-content {
	// margin: 10px;
	.login-button {
		margin-top: 30px;
	}
}
</style>
