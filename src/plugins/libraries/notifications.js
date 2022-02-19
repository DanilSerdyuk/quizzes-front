import Toast, { TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  timeout: 3500,
  closeButton: false,
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: 5000,
    },
  },
};

export default {
  install(Vue) {
    Vue.use(Toast, options);
  },
};
