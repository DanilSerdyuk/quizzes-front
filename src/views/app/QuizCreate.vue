<template>
  <div class="bg-white p-8 rounded-md w-full">
    <div class="flex justify-end">
      <router-link
        type="button"
        :to="{ name: 'quiz.list' }"
        class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm sm:w-auto px-10 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      >
        Back
      </router-link>
    </div>
    <form>
      <validation-observer>
        <div class="w-full md:w-full mb-6">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="title"
          >
            Quiz Name
          </label>
          <validation-provider
            name="Quiz title"
            rules="required|min:3|max:255"
            v-slot="{ passed, failed, errors }"
          >
            <input
              type="text"
              name="title"
              id="title"
              v-model="title"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Enter quiz name here..."
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
      </validation-observer>
      <questions-list-create @save="creatingQuiz" />
    </form>
  </div>
</template>

<script>
import QuestionsListCreate from "@/components/admin/QuestionsListCreate";
import { mapActions } from "vuex";
import { ACTIONS } from "@/store/modules/quiz";

export default {
  name: "QuizCreate",
  components: {
    QuestionsListCreate,
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions("quiz", {
      create: ACTIONS.CREATE,
    }),
    creatingQuiz(questions) {
      this.create({ title: this.title, questions })
        .then(() => this.$toast.success("Created!"))
        .then(() => this.$router.push({ name: "quiz.list" }))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
  },
};
</script>
