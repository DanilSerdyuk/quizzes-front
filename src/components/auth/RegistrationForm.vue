<template>
  <div>
    <div class="display_name flex border rounded text-gray-500 mb-4">
      <input
        class="outline-none px-4 h-full py-2 text-lg"
        type="text"
        placeholder="Name"
        v-model="name"
      />
    </div>
    <div class="display_name flex border rounded text-gray-500 mb-4">
      <input
        class="outline-none px-4 h-full py-2 text-lg"
        type="text"
        placeholder="E-mail"
        v-model="email"
      />
    </div>

    <div class="username flex border rounded text-gray-500 mb-4">
      <input
        class="outline-none px-4 h-full py-2 text-lg"
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>

    <div class="password flex border rounded text-gray-500 mb-4">
      <input
        class="outline-none px-4 h-full py-2 text-lg"
        type="password"
        placeholder="Confirmed Password"
        v-model="confirmPassword"
      />
    </div>

    <div
      @click="submit"
      class="submit border rounded mb-4 bg-indigo-600 text-white cursor-pointer"
    >
      <div class="wrapper flex w-max mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 my-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
        <input
          class="outline-none px-2 h-full cursor-pointer py-2 text-lg bg-transparent"
          type="button"
          value="Register"
        />
      </div>
    </div>
    <redirect-block
      text="Already have an account?"
      push-to="login"
      link-title="Login"
    />
  </div>
</template>

<script>
import RedirectBlock from "@/components/auth/RedirectBlock";

export default {
  name: "RegistrationForm",
  components: {
    RedirectBlock,
  },
  data() {
    return {
      email: null,
      name: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    submit() {
      let args = {
        email: this.email,
        name: this.name,
        password: this.password,
        password_confirmation: this.confirmPassword,
      };

      this.$emit("submit", args);
    },
  },
};
</script>
