<template>
  <div>
    <div class="flex border rounded text-gray-500 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 mx-2 my-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <input
        class="outline-none px-2 h-full py-2 text-lg"
        type="text"
        v-model="email"
        placeholder="email"
      />
    </div>

    <div class="password flex border rounded text-gray-500 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 mx-2 my-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
      <input
        class="outline-none px-2 h-full py-2 text-lg"
        type="password"
        v-model="password"
        placeholder="password"
      />
    </div>

    <div class="show_info text-sm mb-4 w-max text-red-400"></div>

    <div
      @click="submit"
      class="submit border rounded mb-4 bg-indigo-600 text-white cursor-pointer"
    >
      <div class="wrapper flex w-max mx-auto">
        <input
          class="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent"
          type="button"
          value="Login"
        />
      </div>
    </div>
    <redirect-block
      text="Don't have account yet?"
      push-to="registration"
      link-title="Registration"
    />
  </div>
</template>

<script>
import RedirectBlock from "@/components/auth/RedirectBlock";

export default {
  name: "LoginForm",
  components: {
    RedirectBlock,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    submit() {
      let args = {
        email: this.email,
        password: this.password,
      };

      this.$emit("submit", args);
    },
  },
};
</script>
