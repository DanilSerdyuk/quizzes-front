<template>
  <div class="main w-max m-auto mt-10">
    <h2 class="text-2xl mb-6">Register</h2>
    <registration-form @submit="registration" />
  </div>
</template>

<script>
import RegistrationForm from "@/components/auth/RegistrationForm";
import { mapActions } from "vuex";
import { ACTIONS } from "@/store/modules/auth";

export default {
  name: "Registration",
  components: {
    RegistrationForm,
  },
  methods: {
    ...mapActions("auth", {
      registrationAction: ACTIONS.REGISTRATION,
    }),
    registration(params) {
      this.registrationAction(params)
        .then(() => this.$toast.success("User registered!"))
        .catch((e) => this.$toast.error(e.response.data.error.error_message));
    },
  },
};
</script>
