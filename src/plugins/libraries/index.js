import Notifications from "@/plugins/libraries/notifications";
import Modals from "@/plugins/libraries/modals";

export default {
  install(Vue) {
    Vue.use(Notifications);
    Vue.use(Modals);
  },
};
