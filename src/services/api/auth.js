import authHttp from "@/controllers/authHttp";

const TOKEN_KEY = "token";
const ROLES_KEY = "roles";

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
 * @return {array}
 */
function getRoles() {
  const roles = localStorage.getItem(ROLES_KEY);

  return JSON.parse(roles);
}

/**
 * @return {void}
 */
function setRoles(roles) {
  localStorage.setItem(ROLES_KEY, roles);
}

/**
 * @return {void}
 */
function removeRoles() {
  localStorage.removeItem(ROLES_KEY);
}

/**
 * @return {string}
 */
function removeAuth() {
  removeToken();
  removeRoles();
}

/**
 * @return {Promise<void>}
 */
function logout() {
  return authHttp.logout().finally(() => removeAuth());
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
  return authHttp.login(params).then(async (response) => response.data);
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
  return authHttp.authUser().then((response) => {
    setRoles(JSON.stringify(response.data.roles));
    return response.data;
  });
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
  getRoles,
};
