<template>
  <div class="m-auto">
    <nav class="flex justify-between bg-indigo-600">
      <router-link
        :to="{ name: 'admin' }"
        class="text-white py-4 px-6 block hover:text-gray-900 focus:outline-none"
      >
        Quizzes List
      </router-link>

      <button
        @click="$store.dispatch('auth/LOGOUT')"
        :to="{ name: 'logout' }"
        class="text-white py-4 px-6 block hover:text-gray-900 focus:outline-none"
      >
        Logout
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
