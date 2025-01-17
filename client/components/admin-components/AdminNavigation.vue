<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();

const { userInfo } = storeToRefs(authManager);

const isUserInfoLoaded = ref(false);

watchEffect(() => {
  if (userInfo.value && userInfo.value.name) {
    isUserInfoLoaded.value = true;
  }
});
</script>

<template>
  <div class="side-admin-navigation">
    <div class="admin-logo">
      <NuxtLink to="/">
        <NuxtImg src="/images/logo.svg" alt="logo" />
      </NuxtLink>
    </div>

    <div class="user-info">
      <span class="user-full-name"
        >{{ userInfo.name }} {{ userInfo.lastName }}</span
      >
      <span class="user-role">{{ userInfo.role }}</span>
    </div>

    <ul v-if="isUserInfoLoaded">
      <li>
        <NuxtLink to="/admin-panel/all-events">All events</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin-panel/unapproved-requests"
          >Unapproved events</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/admin-panel/create-event">Create event</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin-panel/subscribers">Subscribers</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin-panel/my-profile">My profile</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/admin-panel/banners">Banners</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.side-admin-navigation {
  .admin-logo {
    margin: 20px auto;
    display: flex;
    width: 50%;

    a {
      width: 100%;

      img {
        border-radius: 30%;
        width: inherit;
      }
    }
  }

  .user-info {
    padding: 10px 20px 30px 0;

    @media (max-width: 830px) {
      padding: 10px 5px 30px 0;
    }

    span {
      display: block;
    }

    .user-full-name {
      font-size: 18px;
      color: $white;

      @media (max-width: 830px) {
        font-size: 14px;
      }

      @media (max-width: 425px) {
        font-size: 11px;
      }
    }

    .user-role {
      color: $gray-100;
      font-weight: 300;

      @media (max-width: 830px) {
        font-size: 12px;
      }

      @media (max-width: 725px) {
        font-size: 8px;
      }
    }
  }

  ul {
    li {
      a {
        padding: 15px 20px 15px 0;
        display: block;
        color: $white;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 1px;
        cursor: pointer;

        @media (max-width: 830px) {
          padding: 15px 5px 15px 0;
          font-size: 10px;
        }

        &:hover {
          color: $gray-100;
        }

        &.router-link-active {
          background-color: $green-800;
        }
      }
    }
  }
}
</style>
