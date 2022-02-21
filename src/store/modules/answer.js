import answersService from "@/services/api/answer";

export const ACTIONS = {
  ADD_ANSWERS: "ADD_ANSWERS",
};

const actions = {
  [ACTIONS.ADD_ANSWERS]: (_, payload) => {
    return answersService.addAnswers(payload);
  },
};

export default {
  namespaced: true,
  actions,
};
