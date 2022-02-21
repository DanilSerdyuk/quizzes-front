import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  regex,
  oneOf,
} from "vee-validate/dist/rules";

export default {
  install(Vue) {
    Vue.component("ValidationProvider", ValidationProvider);
    Vue.component("ValidationObserver", ValidationObserver);

    extend("required", {
      ...required,
      message: (field) => `${field} is required.`,
    });

    extend("email", {
      ...email,
      message: "Email is incorrect.",
    });

    extend("oneOf", oneOf);

    extend("min", {
      ...min,
      message: (field, values) =>
        `min values for field ${field} - ${values.length}.`,
    });

    extend("max", {
      ...max,
      message: (field, values) =>
        `max values for field ${field} - ${values.length}.`,
    });

    extend("regex", regex);
  },
};
