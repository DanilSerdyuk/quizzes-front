import http from "@/plugins/http/http";

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
function createQuestion(payload) {
  return http
    .post("api/v1/questions", payload)
    .then((response) => response.data);
}

/**
 * @return {Promise}
 */
function deleteQuestion(id) {
  return http
    .delete(`api/v1/questions/${id}`)
    .then((response) => response.data);
}

export default {
  updateQuestion,
  createQuestion,
  deleteQuestion,
};
