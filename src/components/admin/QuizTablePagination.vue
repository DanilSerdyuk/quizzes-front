<template>
  <div
    class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
  >
    <span class="text-xs xs:text-sm text-gray-900">
      Showing {{ page }} of {{ lastPage }} Pages. Total entries: {{ total }}
    </span>
    <div class="inline-flex mt-2 xs:mt-0">
      <button
        class="mr-1 text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 font-semibold py-2 px-4 rounded-l"
        :class="prevButton ? 'bg-indigo-600' : 'bg-indigo-300'"
        :disabled="!prevButton"
        @click="prev"
      >
        Prev
      </button>
      <button
        class="ml-1 text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 font-semibold py-2 px-4 rounded-r"
        :class="nextButton ? 'bg-indigo-600' : 'bg-indigo-300'"
        :disabled="!nextButton"
        @click="next"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ACTIONS } from "@/store/modules/quiz";

export default {
  name: "QuizTablePagination",
  props: {
    pagination: Object,
  },
  methods: {
    ...mapActions("quiz", {
      getAll: ACTIONS.GET,
    }),
    next() {
      const page =
        this.pagination.current_page < this.pagination.last_page
          ? this.pagination.current_page + 1
          : this.pagination.current_page;

      this.$router.push({ query: { ...this.$route.query, page } });
      this.$emit("nextPage");
    },
    prev() {
      const page =
        this.pagination.current_page >= 1
          ? this.pagination.current_page - 1
          : this.pagination.current_page;

      this.$router.push({ query: { ...this.$route.query, page } });
      this.$emit("prevPage");
    },
  },
  computed: {
    prevButton() {
      return this.pagination.current_page > 1 && this.pagination.total !== 0;
    },
    nextButton() {
      return (
        this.pagination.last_page !== this.pagination.current_page &&
        this.pagination.total > 0
      );
    },
    page() {
      return this.pagination.current_page || 0;
    },
    lastPage() {
      return this.pagination.last_page || 0;
    },
    total() {
      return this.pagination.total || 0;
    },
  },
};
</script>
