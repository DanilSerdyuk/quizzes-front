import quizService from "@/services/api/quiz.js";
// import router from "@/router";

export const ACTIONS = {
  GET: "GET",
  GET_BY_ID: "GET_BY_ID",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

export const MUTATIONS = {
  SET_LIST: "SET_LIST",
  SET_QUIZ: "SET_QUIZ",
  DELETE_QUIZ: "DELETE_QUIZ",
};

export const GETTERS = {
  GET_ALL: "GET_ALL",
  GET_BY_ID: "GET_BY_ID",
  PAGINATION: "PAGINATION",
};

const getters = {
  [GETTERS.GET_ALL]: (state) => state.list,
  [GETTERS.PAGINATION]: (state) => state.pagination,
  [GETTERS.GET_BY_ID]: (state) => state.quiz,
};

const actions = {
  [ACTIONS.GET]({ commit }) {
    return quizService
      .all()
      .then((response) => commit(MUTATIONS.SET_LIST, response));
  },
  [ACTIONS.GET_BY_ID]({ commit }, { id }) {
    return quizService
      .get(id)
      .then((response) => commit(MUTATIONS.SET_QUIZ, response));
  },
  [ACTIONS.CREATE]({ commit }, params) {
    return quizService
      .create(params)
      .then((response) => commit(MUTATIONS.SET_QUIZ, response));
  },
  [ACTIONS.UPDATE]({ commit }, { payload, id }) {
    return quizService
      .update(payload, id)
      .then((response) => commit(MUTATIONS.SET_QUIZ, response));
  },
  [ACTIONS.DELETE]({ commit }, id) {
    return quizService
      .deleteQuiz(id)
      .then(() => commit(MUTATIONS.DELETE_QUIZ, id));
  },
};

const mutations = {
  [MUTATIONS.SET_LIST](state, payload) {
    state.list = payload.data;
    state.pagination = {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
    };
  },
  [MUTATIONS.SET_QUIZ](state, data) {
    state.quiz = data;
  },
  [MUTATIONS.DELETE_QUIZ](state, id) {
    state.list = state.list.filter((i) => i.id !== id);
    state.pagination.total -= 1;
  },
};

export default {
  namespaced: true,
  state: () => ({
    quiz: {},
    list: [],
    pagination: {},
  }),
  getters,
  actions,
  mutations,
};
