import http from "@/plugins/http/http";

/**
 * @return {Promise}
 */
function addAnswers(payload) {
  return http.post("api/v1/answers", payload);
}

export default {
  addAnswers,
};
