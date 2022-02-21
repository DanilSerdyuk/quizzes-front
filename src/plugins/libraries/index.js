import Notifications from "@/plugins/libraries/notifications";
import Modals from "@/plugins/libraries/modals";
import ValidateComponents from "@/plugins/libraries/validate";
import VSelect from "@/plugins/libraries/v-select";

export default {
  install(Vue) {
    Vue.use(Notifications);
    Vue.use(Modals);
    Vue.use(ValidateComponents);
    Vue.use(VSelect);
  },
};
