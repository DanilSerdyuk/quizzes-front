import http from "@/plugins/http/http";

/**
 * @return {Promise}
 */
function index() {
  return http.get("api/v1/quizzes").then((response) => response.data);
}

/**
 * @return {Promise}
 */
function get(id) {
  return http.get(`api/v1/quizzes/${id}`).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function update(payload, id) {
  return http
    .update(`api/v1/quizzes/${id}`, payload)
    .then((response) => response.data);
}

/**
 * @return {Promise}
 */
function create(payload) {
  return http.post("api/v1/quizzes", payload).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function deleteQuiz(id) {
  return http.delete(`api/v1/quizzes/${id}`).then((response) => response.data);
}

export default {
  index,
  get,
  update,
  create,
  deleteQuiz,
};
