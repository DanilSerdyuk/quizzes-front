import { vfmPlugin } from "vue-final-modal";

export default {
  install(Vue) {
    Vue.use(
      vfmPlugin({
        key: "$modal",
      })
    );
  },
};
