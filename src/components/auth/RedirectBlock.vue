<template>
  <div class="text-sm mb-4 w-max text-black-400">
    {{ text }}
    <router-link class="underline" :to="{ name: pushTo }">
      {{ linkTitle }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RedirectBlock",
  props: {
    text: String,
    pushTo: String,
    linkTitle: String,
  },
};
</script>
