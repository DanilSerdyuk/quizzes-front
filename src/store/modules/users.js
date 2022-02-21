import usersService from "@/services/api/users.js";

export const ACTIONS = {
  GET: "GET",
};

export const MUTATIONS = {
  SET_LIST: "SET_LIST",
};

export const GETTERS = {
  GET_ALL: "GET_ALL",
};

const getters = {
  [GETTERS.GET_ALL]: (state) => state.users,
};

const actions = {
  [ACTIONS.GET]: ({ commit }) => {
    return usersService
      .getAll()
      .then((response) => commit(MUTATIONS.SET_LIST, response));
  },
};

const mutations = {
  [MUTATIONS.SET_LIST]: (state, payload) => {
    state.users = payload;
  },
};

export default {
  namespaced: true,
  state: () => ({
    users: [],
  }),
  getters,
  actions,
  mutations,
};
