import quizHttp from "@/controllers/quizHttp";

/**
 * @return {Promise}
 */
function all() {
  return quizHttp.index().then((response) => response.data);
}

/**
 * @return {Promise}
 */
function get(id) {
  return quizHttp.get(id).then((response) => response.data);
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
function create(payload) {
  return quizHttp.create(payload).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function deleteQuiz(id) {
  return quizHttp.deleteQuiz(id).then((response) => response.data);
}

export default {
  all,
  get,
  update,
  create,
  deleteQuiz,
};
