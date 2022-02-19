<template>
  <div class="bg-white p-8 rounded-md w-full">
    <quiz-page-header />
    <div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <transition name="slide-fade" mode="out-in">
            <div v-if="loading" class="flex justify-center my-10">
              <div
                style="border-top-color: transparent"
                class="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
              />
            </div>
            <table v-else class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    :key="index"
                    v-for="(header, index) of headers"
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {{ header.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr :key="quiz.id ? quiz.id : inx" v-for="(quiz, inx) of list">
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ quiz.title }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                        />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {{ quiz.user.name }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <span
                      class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                    >
                      <span
                        aria-hidden
                        class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      ></span>
                      <span class="relative">Active</span>
                    </span>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ quiz.fields_count }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 whitespace-no-wrap">
                      {{ quiz.created_at }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <button
                      class="mr-2 bg-blue-600 px-2 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                      Edit Quiz
                    </button>
                    <button
                      class="ml-2 bg-red-600 px-2 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                      @click="openModal(quiz.id)"
                    >
                      Delete Quiz
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </transition>
          <quiz-table-pagination :pagination="pagination" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuizPageHeader from "@/components/admin/QuizPageHeader";
import QuizTablePagination from "@/components/admin/QuizTablePagination";

export default {
  name: "QuizTable",
  components: {
    QuizPageHeader,
    QuizTablePagination,
  },
  props: {
    loading: Boolean,
    headers: {
      type: Array,
      default: () => [
        { name: "Title" },
        { name: "Author" },
        { name: "Status" },
        { name: "Questions" },
        { name: "Created at" },
        { name: "" },
      ],
    },
    pagination: Object,
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    openModal(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
