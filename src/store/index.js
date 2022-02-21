import Vue from "vue";
import Vuex from "vuex";

// modules
import auth from "@/store/modules/auth";
import quiz from "@/store/modules/quiz";
import users from "@/store/modules/users";
import answer from "@/store/modules/answer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    quiz,
    users,
    answer,
  },
});
