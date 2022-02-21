<template>
  <div class="w-max m-auto mt-10">
    <h2 class="text-2xl mb-6">Login</h2>
    <login-form @submit="login" />
  </div>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm";
import { mapActions } from "vuex";
import { ACTIONS } from "@/store/modules/auth";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions("auth", {
      loginAction: ACTIONS.LOGIN,
      authUser: ACTIONS.ME,
    }),
    login(params) {
      this.loginAction(params)
        .then(() =>
          this.authUser().catch((e) =>
            this.$toast.error(e.response.data.error.error_message)
          )
        )
        .then(() => this.$router.push({ name: "quiz.list" }))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
  },
};
</script>
