<script setup>
function redirectToMyAccountPage() {
  navigateTo("/admin-panel/my-profile");
}
</script>

<template>
  <div class="header">
    <div class="avatar-wrapper" @click="redirectToMyAccountPage">
      <NuxtImg src="/images/avatar-default.svg" alt="avatar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;

  .avatar-wrapper {
    height: 35px;
    display: flex;
    width: 35px;
    background-color: $white;
    border: 1px solid $gray-850;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: inherit;
      padding: 3px;
    }
  }
}
</style>
