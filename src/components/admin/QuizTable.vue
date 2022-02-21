<template>
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
          <table v-else class="min-w-full">
            <thead>
              <tr>
                <th
                  :key="index"
                  v-for="(header, index) of headers"
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  :class="header.class"
                >
                  {{ header.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="list.length">
                <tr :key="quiz.id" v-for="quiz of list">
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 break-all">
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
                        <p class="text-gray-900 break-all">
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
                    <p class="text-gray-900 break-all">
                      {{ quiz.questions_count }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <p class="text-gray-900 break-all">
                      {{ quiz.created_at }}
                    </p>
                  </td>
                  <td
                    class="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                  >
                    <template v-if="isAdmin">
                      <button
                        @click="openModal('quizAssignee', quiz.id)"
                        class="mr-2 bg-green-600 px-2 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                      >
                        Assignee
                      </button>
                      <router-link
                        type="button"
                        :to="{ name: 'quiz.edit', params: { id: quiz.id } }"
                        class="mr-2 ml-2 bg-blue-600 px-2 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                      >
                        Edit Quiz
                      </router-link>
                      <button
                        class="ml-2 bg-red-600 px-2 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                        @click="openModal('quizDelete', quiz.id)"
                      >
                        Delete Quiz
                      </button>
                    </template>
                    <template v-else>
                      <router-link
                        type="button"
                        :to="{ name: 'quiz.show', params: { slug: quiz.slug } }"
                        class="mr-2 ml-2 bg-blue-600 px-2 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                      >
                        Show Quiz
                      </router-link>
                    </template>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td class="py-4 text-center" colspan="100%">
                  <p class="text-gray-600 font-semibold">
                    No quizzes... Create one!
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </transition>
        <modal-confirm-component
          name="quizDelete"
          v-model="modal"
          @confirm="startDeleteQuiz"
          @cancel="modal = !modal"
        >
          <template v-slot:icon>
            <svg
              class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </template>
          <template v-slot:title>
            <h3
              class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this quiz?
            </h3>
          </template>
        </modal-confirm-component>
        <modal-confirm-component
          name="quizAssignee"
          v-model="assigneeModal"
          confirm-color-button="blue"
          @confirm="assignee"
          @cancel="closeModal"
        >
          <template v-slot:select>
            <div class="w-96 mb-12">
              <v-select
                label="name"
                :multiple="true"
                :options="users"
                :reduce="(user) => user.id"
                :closeOnSelect="false"
                v-model="assigneeList"
              />
            </div>
          </template>
        </modal-confirm-component>
      </div>
    </div>
  </div>
</template>

<script>
import ModalConfirmComponent from "@/components/global/ModalConfirmComponent";
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/users";

export default {
  name: "QuizTable",
  components: {
    ModalConfirmComponent,
  },
  data() {
    return {
      modal: false,
      assigneeModal: false,
      assigneeList: [],
    };
  },
  props: {
    loading: Boolean,
    isAdmin: Boolean,
    headers: {
      type: Array,
      default: () => [
        { name: "Title", class: "w-1/3" },
        { name: "Author", class: "w-1/6" },
        { name: "Status", class: "w-1/7" },
        { name: "Questions", class: "w-1/8" },
        { name: "Created at", class: "w-1/7" },
        { name: "", class: "w-1/4" },
      ],
    },
    list: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters("users", {
      users: GETTERS.GET_ALL,
    }),
  },
  methods: {
    ...mapActions("users", {
      getUsers: ACTIONS.GET,
    }),
    openModal(name, id) {
      //https://vue-final-modal.org/examples/stepByStep
      this.$modal.show(name, { id });
    },
    startDeleteQuiz(id) {
      this.$emit("delete", id);
    },
    closeModal() {
      this.assigneeModal = !this.assigneeModal;
      this.assigneeList = [];
    },
    assignee(params) {
      if (this.assigneeList.length) {
        this.$emit("onAssignee", {
          users: this.assigneeList,
          quiz_id: params.id,
        });
        return;
      }

      return this.$toast.error("Need at least one user.");
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
