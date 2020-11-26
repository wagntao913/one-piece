import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入vant 组件库
import Vant from "vant";
import "vant/lib/index.css";

// 引入mock
import "./mock";

// 全局引入rem
import "@/utils/rem";

createApp(App)
  .use(store)
  .use(router)
  .use(Vant)
  .mount("#app");
