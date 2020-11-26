<template>
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
      type="password"
      v-model="password"
      placeholder="请输入密码"
      label="密码"
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
    <van-button type="primary" @click="loginClick()" block>登录</van-button>
  </div>
</template>

<script>
import md5 from "js-md5";

import VerficationCode from "@/components/VerficationCode";

import { reactive, toRefs } from "vue";
import { Toast } from "vant";
import { login } from "@/api";

export default {
  name: "Home",
  components: {
    VerficationCode
  },
  setup() {
    const state = reactive({
      username: "",
      password: "",
      smsCode: "",
      receiveCode: ""
    });

    const loginClick = () => {
      const params = {
        username: state.username,
        password: md5(state.password),
        smsCode: state.smsCode
      };
      login(params).then(res => {
        console.log(res);
        if (res) {
          Toast(res.message);
        }
      });
    };

    return {
      ...toRefs(state),
      loginClick
    };
  }
};
</script>

<style lang="scss">
.login-content {
  // margin: 10px;
}
</style>
