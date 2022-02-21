<template>
  <div class="bg-white p-8 rounded-md w-full">
    <div class="flex justify-end pb-6">
      <router-link
        type="button"
        :to="{ name: 'quiz.list' }"
        class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm sm:w-auto px-10 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      >
        Back
      </router-link>
    </div>
    <validation-observer v-slot="{ handleSubmit }">
      <div
        :key="question.id"
        v-for="question in questions"
        class="w-full md:w-full mb-6"
      >
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          :for="`question-${question.id}`"
        >
          {{ question.title }}
        </label>
        <validation-provider
          name="Quiz title"
          rules="required|max:255"
          v-slot="{ errors }"
        >
          <input
            name="title"
            :type="question.type"
            :id="`question-${question.id}`"
            v-model="answers[question.id]"
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :placeholder="
              question.type === 'text'
                ? 'Enter text here...'
                : 'Enter number here...'
            "
          />
          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {{ errors[0] }}
          </p>
        </validation-provider>
      </div>
      <div>
        <button
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-3 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          @click="handleSubmit(submit)"
        >
          Submit
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/quiz";
import { ACTIONS as ACTIONS_ANSWER } from "@/store/modules/answer";

export default {
  name: "Survey",
  data() {
    return {
      answers: {},
    };
  },
  computed: {
    ...mapGetters("quiz", {
      quiz: GETTERS.GET_QUIZ,
    }),
    questions() {
      return this.quiz.questions;
    },
  },
  methods: {
    ...mapActions("quiz", {
      getQuizBySlug: ACTIONS.GET_BY_SLUG,
    }),
    ...mapActions("answer", {
      addAnswers: ACTIONS_ANSWER.ADD_ANSWERS,
    }),
    submit() {
      this.addAnswers({ answers: this.answers })
        .then(() => this.$toast.success("Thank you! On u email send answers."))
        .then(() => this.$router.push({ name: "quiz.list" }))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
  },
  created() {
    this.getQuizBySlug(this.$route.params.slug).catch((e) =>
      this.$toast.error(e.response.data.error.error_message)
    );
  },
};
</script>
