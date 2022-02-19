import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import Plugins from "@/plugins/libraries/index";
import "./assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(Plugins);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
