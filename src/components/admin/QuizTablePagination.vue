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
        :class="prevButton ? 'bg-indigo-300' : 'bg-indigo-600'"
        :disabled="prevButton"
      >
        Prev
      </button>
      <button
        class="ml-1 text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 font-semibold py-2 px-4 rounded-r"
        :class="nextButton ? 'bg-indigo-300' : 'bg-indigo-600'"
        :disabled="nextButton"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizTablePagination",
  props: {
    pagination: Object,
  },
  computed: {
    prevButton() {
      return this.pagination.current_page === this.pagination.from;
    },
    nextButton() {
      return this.pagination.last_page === this.pagination.current_page;
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
