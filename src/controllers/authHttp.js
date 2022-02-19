import http from "@/plugins/http/http";

/**
 * @return {Promise<AxiosResponse<any>>}
 */
function logout() {
  return http.post("api/auth/logout").then((res) => res.data);
}

/**
 * @param {Object} params
 * @return {Promise<AxiosResponse<any>>}
 */
function login(params) {
  return http.post("api/auth/login", params).then((res) => res.data);
}

/**
 * @param {Object} params
 * @return {Promise<AxiosResponse<any>>}
 */
function registration(params) {
  return http.post("api/auth/registration", params).then((res) => res.data);
}

/**
 * @return {Promise<AxiosResponse<any>>}
 */
function refresh() {
  return http.post("api/auth/refresh").then((res) => res.data);
}

/**
 * @return {Promise<AxiosResponse<any>>}
 */
function authUser() {
  return http.get("api/auth/me").then((res) => res.data);
}

export default {
  logout,
  login,
  refresh,
  registration,
  authUser,
};
