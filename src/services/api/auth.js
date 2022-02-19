import authHttp from "@/controllers/authHttp";

const TOKEN_KEY = "token";

/**
 * @param {string} token
 *
 * @return void
 */
function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * @return void
 */
function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * @return {string}
 */
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * @return {Promise<void>}
 */
function logout() {
  return authHttp.logout().finally(() => removeToken());
}

/**
 * @return {Promise<void>}
 */
function refresh() {
  return authHttp.refresh().then((response) => response.data);
}

/**
 * @param {Object} params
 * @return {Promise<AxiosResponse<any>>}
 */
function login(params) {
  return authHttp.login(params).then((response) => response.data);
}

/**
 * @param {Object} params
 * @return {Promise<AxiosResponse<any>>}
 */
function registration(params) {
  return authHttp.registration(params).then((response) => response.data);
}

/**
 * @param {Object} params
 * @return {Promise<AxiosResponse<any>>}
 */
function authUser() {
  return authHttp.authUser().then((response) => response.data);
}

export default {
  setToken,
  removeToken,
  getToken,
  logout,
  refresh,
  registration,
  authUser,
  login,
};
