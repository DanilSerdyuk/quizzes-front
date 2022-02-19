import Vue from "vue";
import Vuex from "vuex";

// modules
import auth from "@/store/modules/auth";
import quiz from "@/store/modules/quiz";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    quiz,
  },
});
