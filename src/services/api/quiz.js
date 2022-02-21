import quizHttp from "@/controllers/quizHttp";

/**
 * @return {Promise}
 */
function all(params) {
  return quizHttp.index(params).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function getById(id) {
  return quizHttp.getById(id).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function get(slug) {
  return quizHttp.get(slug).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function update(payload, id) {
  return quizHttp.update(payload, id).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function updateQuestion(payload, id) {
  return quizHttp.updateQuestion(payload, id).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function create(payload) {
  return quizHttp.create(payload).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function deleteQuiz(id) {
  return quizHttp.deleteQuiz(id).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function assigneeUsers(params) {
  return quizHttp.assigneeUsers(params).then((response) => response.data);
}

export default {
  all,
  get,
  getById,
  update,
  create,
  deleteQuiz,
  assigneeUsers,
  updateQuestion,
};
