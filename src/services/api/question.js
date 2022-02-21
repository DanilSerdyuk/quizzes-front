import questionHttp from "@/controllers/questionHttp";

/**
 * @return {Promise}
 */
function updateQuestion(payload, id) {
  return questionHttp
    .updateQuestion(payload, id)
    .then((response) => response.data);
}

/**
 * @return {Promise}
 */
function createQuestion(payload) {
  return questionHttp.createQuestion(payload).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function deleteQuestion(id) {
  return questionHttp.deleteQuestion(id).then((response) => response.data);
}

export default {
  updateQuestion,
  createQuestion,
  deleteQuestion,
};
