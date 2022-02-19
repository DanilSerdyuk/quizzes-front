<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import auth from "@/services/api/auth";

export default {
  created() {
    if (auth.getToken()) {
      this.$store.dispatch("auth/ME");
    }
  },
};
</script>
