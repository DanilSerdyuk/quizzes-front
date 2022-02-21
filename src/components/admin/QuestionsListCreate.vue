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
            for="question"
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
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="question"
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
            for="type"
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
                :class="[
                  {
                    'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500':
                      failed,
                  },
                ]"
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="type"
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
            for="grid-zip"
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
              ]"
              v-model="question.correct_answer"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
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
            @click.prevent="deleteEl(index)"
            class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm sm:w-28 px-5 py-3.5 text-center dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="flex mt-4 justify-between">
        <button
          @click.prevent="handleSubmit(saving)"
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-3 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Save
        </button>
        <button
          @click.prevent="addMore"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add one more
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: "QuestionsListCreate",
  data() {
    return {
      questions: [{}],
    };
  },
  methods: {
    addMore() {
      this.questions.push({});
    },
    deleteEl(index) {
      if (this.questions.length === 1) {
        this.$toast.error("Can't delete this question. Need at least one");
        return;
      }

      this.questions.splice(index, 1);
    },
    saving() {
      this.$emit("save", this.questions);
    },
  },
};
</script>
