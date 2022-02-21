import http from "@/plugins/http/http";

/**
 * @return {Promise}
 */
function getAll() {
  return http.get("api/v1/users").then((response) => response.data);
}

export default {
  getAll,
};
