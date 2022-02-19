/**
 * @return {string}
 */
export function getSelfHost() {
  return process.env.BASE_URL;
}

/**
 * @return {string}
 */
export function getBackendHost() {
  return process.env.VUE_APP_API_URL;
}

/**
 * @return {string}
 */
export function getApplicationType() {
  return process.env.VUE_APP_TYPE;
}
