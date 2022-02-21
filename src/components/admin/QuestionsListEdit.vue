<template>
  <div>
    <validation-observer v-slot="{ handleSubmit }">
      <div
        :key="index"
        v-for="(question, index) in questions"
        class="flex flex-no-wrap -mx-3 mb-2"
      >
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :for="`question-${index}`"
          >
            Question
          </label>
          <validation-provider
            name="Question"
            :vid="`question-${index}`"
            rules="required|min:3|max:255"
            v-slot="{ passed, failed, errors }"
          >
            <input
              v-model="question.title"
              @change="handleSubmit(() => updateOrCreateNew(question))"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :id="`question-${index}`"
              type="text"
              placeholder="Enter question here..."
              :class="[
                {
                  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
                    failed,
                },
              ]"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {{ errors[0] }}
            </p>
          </validation-provider>
        </div>
        <div class="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :for="`type-${index}`"
          >
            Question answer type
          </label>
          <validation-provider
            name="Answer type"
            :vid="`type-${index}`"
            rules="required|oneOf:text,number"
            v-slot="{ passed, failed, errors }"
          >
            <div class="relative">
              <select
                v-model="question.type"
                @change="handleSubmit(() => updateOrCreateNew(question))"
                :class="[
                  {
                    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
                      failed,
                  },
                ]"
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                :id="`type-${index}`"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {{ errors[0] }}
            </p>
          </validation-provider>
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :for="`answer-${index}`"
          >
            Answer
          </label>
          <validation-provider
            name="Answer"
            :vid="`answer-${index}`"
            :rules="{
              required: true,
              min: question.type === 'text' ? 2 : 1,
              max: 255,
            }"
            v-slot="{ passed, failed, errors }"
          >
            <input
              :disabled="!question.type"
              :class="[
                {
                  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
                    failed,
                },
                {
                  disabled: !question.type,
                },
              ]"
              v-model="question.correct_answer"
              @change="handleSubmit(() => updateOrCreateNew(question))"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :id="`answer-${index}`"
              :type="question.type === 'number' ? 'number' : 'text'"
              :placeholder="
                question.type
                  ? question.type === 'text'
                    ? 'Enter text...'
                    : 'Enter number...'
                  : ''
              "
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {{ errors[0] }}
            </p>
          </validation-provider>
        </div>
        <div class="md:w-1/8 px-3 my-6 md:mb-0">
          <button
            @click.prevent="deleteEl(index, question.id)"
            class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm sm:w-28 px-5 py-3.5 text-center dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="flex mt-4 justify-end">
        <button
          :disabled="!canAdd"
          @click.prevent="addMore"
          class="text-white font-medium rounded-lg text-sm sm:w-auto px-3 py-2.5 text-center"
          :class="[
            {
              'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800':
                canAdd,
            },
            {
              'text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:gray-blue-800':
                !canAdd,
            },
          ]"
        >
          Add one more
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/quiz";
import debounce from "lodash/debounce";

export default {
  name: "QuestionsListEdit",
  computed: {
    ...mapGetters("quiz", {
      quiz: GETTERS.GET_QUIZ,
    }),
    questions() {
      return this.quiz.questions;
    },
  },
  data() {
    return {
      canAdd: true,
    };
  },
  methods: {
    ...mapActions("quiz", {
      updateAction: ACTIONS.UPDATE_QUESTION,
      createAction: ACTIONS.CREATE_QUESTION,
      deleteAction: ACTIONS.DELETE_QUESTION,
    }),
    updateOrCreateNew: debounce(function (question) {
      if (question.id) {
        return this.updateAction({ id: question.id, question })
          .then(() => this.$toast.success("Question is Updated!"))
          .then(() => (this.canAdd = true))
          .catch((e) => this.$toast.error(e.response.data.error.error_message));
      }

      return this.createAction({ quiz_id: this.$route.params.id, ...question })
        .then(() => this.$toast.success("New question added!"))
        .then(() => (this.canAdd = true))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    }, 1000),
    addMore() {
      this.$store.commit("quiz/ADD_NEW_EMPTY_QUESTION", {});
      this.canAdd = false;
    },
    deleteEl(index, id) {
      if (this.questions.length === 1) {
        this.$toast.error("Can't delete this question. Need at least one");
        return;
      }

      if (id) {
        return this.deleteAction(id)
          .then(() => this.$toast.success("Question deleted!"))
          .catch((e) => this.$toast.error(e.response.data.error.error_message));
      }

      this.canAdd = true;
      return this.$store.commit("quiz/REMOVE_QUESTION_BY_INDEX", index);
    },
  },
};
</script>
