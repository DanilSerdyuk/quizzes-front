import usersHttp from "@/controllers/usersHttp";

/**
 * @return {Promise}
 */
function getAll() {
  return usersHttp.getAll().then((response) => response.data);
}

export default {
  getAll,
};
