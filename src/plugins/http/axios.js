import { getBackendHost } from "@/services/config/env";
import authService from "@/services/api/auth";
import router from "@/router";
import store from "@/store";

export default class Axios {
  _instance = null;
  _headers = null;
  _host = null;

  /**
   * @param {object} instance
   * @param {object} headers
   * @param {string} host
   */
  constructor(instance, headers = {}, host = getBackendHost()) {
    this._setHost(host);
    this._setHeaders(headers);
    this._setInstance(instance);
  }

  /**
   * @param {object} instance
   * @private
   *
   * @return void
   */
  _setInstance(instance) {
    if (this._instance) {
      return;
    }

    this._instance = instance.create({
      baseURL: this._host,
      headers: { ...this._headers },
    });
  }

  /**
   * @param host
   * @private
   */
  _setHost(host) {
    this._host = host;
  }

  /**
   * @param headers
   * @private
   */
  _setHeaders(headers) {
    this._headers = {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * @return void
   * @private
   */
  _setResponseInterceptor() {
    this._instance.interceptors.response.use(
      (response) => response,
      async (e) => {
        const original = e.config;

        if (
          e.response.status === 401 &&
          !original._retry &&
          authService.getToken()
        ) {
          original._retry = true;

          try {
            await store.dispatch("auth/REFRESH");
          } catch (err) {
            this._userNotAuthorized();

            return Promise.reject(err);
          }

          this._instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${authService.getToken()}`;

          return this._instance(original);
        }

        if (e.response.status === 401 && original._retry) {
          this._userNotAuthorized();
        }

        return Promise.reject(e);
      }
    );
  }

  /**
   * @return void
   * @private
   */
  _userNotAuthorized() {
    authService.removeToken();

    router.push({ name: "login" });
  }

  /**
   * @return void
   * @private
   */
  _setRequestInterceptor() {
    this._instance.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${authService.getToken()}`;

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /**
   * @return {object}
   */
  getInstance() {
    return this._instance;
  }

  /**
   * Set interceptors for response and request, for axios
   *
   * @return void
   */
  setInterceptors() {
    this._setResponseInterceptor();
    this._setRequestInterceptor();
  }
}
