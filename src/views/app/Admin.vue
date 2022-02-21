<template>
  <div>
    <nav-bar></nav-bar>
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from "@/components/global/NavBar";

export default {
  name: "Admin",
  components: {
    NavBar,
  },
};
</script>
