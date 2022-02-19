import authService from "@/services/api/auth";
import router from "@/router";

export const ACTIONS = {
  ME: "ME",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REFRESH: "REFRESH",
  REGISTRATION: "REGISTRATION",
};

export const MUTATIONS = {
  SET_TOKEN: "SET_TOKEN",
  SET_USER: "SET_USER",
};

export const GETTERS = {
  GET_AUTH_USER: "GET_AUTH_USER",
};

const getters = {
  [GETTERS.GET_AUTH_USER]: (state) => state.user,
};

const actions = {
  [ACTIONS.ME]({ commit }) {
    return authService
      .authUser()
      .then((response) => commit(MUTATIONS.SET_USER, response));
  },
  [ACTIONS.LOGIN]({ commit }, params) {
    return authService
      .login(params)
      .then((response) => commit(MUTATIONS.SET_TOKEN, response));
  },
  [ACTIONS.REGISTRATION](_, params) {
    return authService
      .registration(params)
      .then(() => router.push({ name: "login" }));
  },
  [ACTIONS.REFRESH]({ commit }) {
    return authService
      .refresh()
      .then((response) => commit(MUTATIONS.SET_TOKEN, response));
  },
  [ACTIONS.LOGOUT]() {
    return authService.logout().then(() => router.push({ name: "login" }));
  },
};

const mutations = {
  [MUTATIONS.SET_TOKEN](state, data) {
    authService.setToken(data.access_token);
  },
  [MUTATIONS.SET_USER](state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state: () => ({
    user: {},
  }),
  getters,
  actions,
  mutations,
};
