<script setup>
definePageMeta({
  layout: "admin-panel",
});

onMounted(() => {
  navigateTo("/admin-panel/all-events");
});
</script>

<template>
  <div>
    <h1>Admin Panel</h1>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
</style>
