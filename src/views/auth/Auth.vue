<template>
  <div class="w-max m-auto mt-10">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>
