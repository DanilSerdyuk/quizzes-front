<template>
  <div class="flex items-center justify-between pb-6">
    <div>
      <h2 class="text-gray-600 font-semibold">Quizzes</h2>
      <span class="text-xs">All quizzes item</span>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex bg-gray-50 items-center p-2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          class="bg-gray-50 outline-none ml-1 block"
          type="text"
          v-model="search"
          placeholder="Press enter for search..."
          @keyup.enter="getList"
        />
      </div>
      <div v-if="isAdmin" class="lg:ml-40 ml-10 space-x-8">
        <router-link
          tag="button"
          class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          :to="{ name: 'quiz.create' }"
        >
          New Quiz
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizPageHeader",
  props: {
    isAdmin: Boolean,
  },
  data() {
    return {
      search: this.$route.query.q ? this.$route.query.q : "",
    };
  },
  methods: {
    getList() {
      if (this.search.length === 0) {
        this.$router.push({ name: "admin" });
      }

      if (this.search.length > 0 && this.search.length < 3) {
        this.$toast.error("Min length 3 symbols!");

        return;
      }

      this.$router.push({ query: { q: this.search } });
      this.$emit("setSearch");
    },
  },
};
</script>
