import quizService from "@/services/api/quiz";
import questionService from "@/services/api/question";

export const ACTIONS = {
  GET: "GET",
  GET_BY_ID: "GET_BY_ID",
  GET_BY_SLUG: "GET_BY_SLUG",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  CREATE_QUESTION: "CREATE_QUESTION",
  DELETE_QUESTION: "DELETE_QUESTION",
  DELETE: "DELETE",
  ASSIGNEE: "ASSIGNEE",
};

export const MUTATIONS = {
  SET_LIST: "SET_LIST",
  SET_QUIZ: "SET_QUIZ",
  ADD_NEW_QUESTION: "ADD_NEW_QUESTION",
  REMOVE_QUESTION_BY_INDEX: "REMOVE_QUESTION_BY_INDEX",
  REMOVE_QUESTION_BY_ID: "REMOVE_QUESTION_BY_ID",
  ADD_NEW_EMPTY_QUESTION: "ADD_NEW_EMPTY_QUESTION",
  DELETE_QUIZ: "DELETE_QUIZ",
};

export const GETTERS = {
  GET_ALL: "GET_ALL",
  GET_QUIZ: "GET_QUIZ",
  PAGINATION: "PAGINATION",
};

const actions = {
  [ACTIONS.GET]: ({ commit }, params) => {
    return quizService
      .all(params)
      .then((response) => commit(MUTATIONS.SET_LIST, response));
  },
  [ACTIONS.GET_BY_ID]: ({ commit }, id) => {
    return quizService
      .getById(id)
      .then((response) => commit(MUTATIONS.SET_QUIZ, response));
  },
  [ACTIONS.GET_BY_SLUG]: ({ commit }, slug) => {
    return quizService
      .get(slug)
      .then((response) => commit(MUTATIONS.SET_QUIZ, response));
  },
  [ACTIONS.CREATE]: ({ commit }, params) => {
    return quizService
      .create(params)
      .then((response) => commit(MUTATIONS.SET_QUIZ, response));
  },
  [ACTIONS.UPDATE]: (_, { payload, id }) => {
    return quizService.update(payload, id);
  },
  [ACTIONS.UPDATE_QUESTION]: (_, payload) => {
    return questionService.updateQuestion(payload.question, payload.id);
  },
  [ACTIONS.CREATE_QUESTION]: ({ commit }, payload) => {
    return questionService
      .createQuestion(payload)
      .then((response) => commit(MUTATIONS.ADD_NEW_QUESTION, response));
  },
  [ACTIONS.DELETE_QUESTION]: ({ commit }, id) => {
    return questionService
      .deleteQuestion(id)
      .then(() => commit(MUTATIONS.REMOVE_QUESTION_BY_ID, id));
  },
  [ACTIONS.DELETE]: ({ commit }, id) => {
    return quizService
      .deleteQuiz(id)
      .then(() => commit(MUTATIONS.DELETE_QUIZ, id));
  },
  [ACTIONS.ASSIGNEE]: (_, params) => {
    return quizService.assigneeUsers(params);
  },
};

const mutations = {
  [MUTATIONS.SET_LIST]: (state, payload) => {
    state.list = payload.data;
    state.pagination = {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
    };
  },
  [MUTATIONS.SET_QUIZ]: (state, quiz) => {
    state.quiz = { ...state.quiz, ...quiz };
  },
  [MUTATIONS.ADD_NEW_QUESTION]: (state, question) => {
    state.quiz.questions = state.quiz.questions.filter((i) => i.id);
    state.quiz.questions.push(question);
  },
  [MUTATIONS.ADD_NEW_EMPTY_QUESTION]: (state, question) => {
    state.quiz.questions.push(question);
  },
  [MUTATIONS.REMOVE_QUESTION_BY_INDEX]: (state, index) => {
    state.quiz.questions.splice(index, 1);
  },
  [MUTATIONS.REMOVE_QUESTION_BY_ID]: (state, id) => {
    state.quiz.questions = state.quiz.questions.filter((i) => i.id !== id);
  },
  [MUTATIONS.DELETE_QUIZ]: (state, id) => {
    state.list = state.list.filter((i) => i.id !== id);
    state.pagination.total -= 1;
  },
};

const getters = {
  [GETTERS.GET_ALL]: (state) => state.list,
  [GETTERS.PAGINATION]: (state) => state.pagination,
  [GETTERS.GET_QUIZ]: (state) => state.quiz,
};

export default {
  namespaced: true,
  state: () => ({
    list: [],
    pagination: {},
    quiz: {
      title: "",
      questions: [],
    },
  }),
  getters,
  actions,
  mutations,
};
