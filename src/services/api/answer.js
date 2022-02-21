import answerHttp from "@/controllers/answerHttp";

/**
 * @return {Promise}
 */
function addAnswers(payload) {
  return answerHttp.addAnswers(payload);
}

export default {
  addAnswers,
};
