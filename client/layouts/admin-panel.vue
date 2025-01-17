<script setup>
import AdminHeader from "@/components/admin-components/AdminHeader";
import AdminNavigation from "@/components/admin-components/AdminNavigation";

import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();

onMounted(async () => {
  if (!authManager.loggedIn) {
    navigateTo("/sign-in");
  }
});
</script>

<template>
  <div class="admin-panel">
    <div class="right-admin">
      <AdminNavigation />
    </div>
    <div class="left-admin">
      <AdminHeader />

      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.admin-panel {
  display: flex;
  width: 100%;
  min-height: 100vh;

  .left-admin {
    width: 85%;
    display: flex;
    flex-direction: column;

    @media (max-width: 935px) {
      width: 80%;
    }

    @media (max-width: 830px) {
      width: 90%;
    }
  }

  .right-admin {
    width: 15%;
    display: flex;
    flex-direction: column;
    background-color: $green-600;
    display: flex;
    flex-direction: column;

    @media (max-width: 935px) {
      width: 20%;
    }

    @media (max-width: 830px) {
      width: 10%;
    }
  }
}
</style>
