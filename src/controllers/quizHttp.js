import http from "@/plugins/http/http";
import qs from "qs";

/**
 * @return {Promise}
 */
function index(params) {
  return http
    .get("api/v1/quizzes", {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    })
    .then((response) => response.data);
}

/**
 * @return {Promise}
 */
function get(slug) {
  return http.get(`api/v1/quizzes/${slug}`).then((response) => response.data);
}

/**
 * @return {Promise}
 */
function getById(id) {
  return http
    .get(`api/v1/quizzes/show/${id}`)
    .then((response) => response.data);
}

/**
 * @return {Promise}
 */
function update(payload, id) {
  return http
    .put(`api/v1/quizzes/${id}`, payload)
    .then((response) => response.data);
}

/**
 * @return {Promise}
 */
function updateQuestion(payload, id) {
  return http
    .put(`api/v1/questions/${id}`, payload)
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

/**
 * @return {Promise}
 */
function assigneeUsers(params) {
  return http
    .post("api/v1/quizzes/assignee", params)
    .then((response) => response.data);
}

export default {
  index,
  get,
  getById,
  update,
  create,
  deleteQuiz,
  assigneeUsers,
  updateQuestion,
};
