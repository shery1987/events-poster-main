<script setup>
definePageMeta({
  layout: "admin-panel",
});

import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const { userInfo, userId } = storeToRefs(authManager);
const isAuthInitialized = ref(false);

const userData = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  await authManager.initializeAuthState();
  isAuthInitialized.value = true;

  if (userId.value) {
    const { data, error: fetchError } = await useFetch(
      `${API_URL}/user/${userId.value}`
    );
    if (data.value) {
      userData.value = data.value;
    } else {
      console.error("Error fetching user data:", fetchError.value);
    }
  } else {
    console.error("User ID is missing");
  }

  isLoading.value = false;
});

async function logoutUser() {
  await authManager.logout();
  window.location.reload();
}
</script>

<template>
  <div class="admin-content-wrapper">
    <div class="profile-header">
      <div class="user-avatar">
        <NuxtImg src="/images/photo-camera.svg" alt="camera" />
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Loading suggestions...</p>
    </div>

    <div
      v-else-if="userData && userData.first_name && !isLoading"
      class="user-information-wrapper"
    >
      <div class="name-and-role">
        <span class="name"
          >{{ userData.first_name }} {{ userData.last_name }}</span
        >
        <span>{{ userInfo.role }}</span>
      </div>

      <div class="main-user-information">
        <div class="personal-information">
          <div class="subheader">
            <NuxtImg
              class="green-icon"
              src="/images/green-user.svg"
              alt="user-icon"
            />
            <span class="subheader-text">PERSONAL INFORMATION</span>
          </div>

          <div class="information-content">
            <div v-if="userData.first_name" class="single-info-point-block">
              <span class="info-item">First name</span>
              <span class="info-item-content">{{ userData.first_name }}</span>
            </div>

            <div v-if="userData.last_name" class="single-info-point-block">
              <span class="info-item">Last name</span>
              <span class="info-item-content">{{ userData.last_name }}</span>
            </div>

            <div v-if="userData.email" class="single-info-point-block">
              <span class="info-item">email</span>
              <span class="info-item-content">{{ userData.email }}</span>
            </div>

            <div v-if="userData.role" class="single-info-point-block">
              <span class="info-item">role</span>
              <span class="info-item-content">{{ userData.role }}</span>
            </div>

            <div class="single-info-point-block logout-btn">
              <NuxtLink class="gray-btn" @click="logoutUser" to="/"
                >Log Out</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.admin-content-wrapper {
  width: 100%;
  padding: 0 10px;
  margin: 0 auto 60px auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 834px) {
    margin: 20px auto 150px auto;
  }

  .profile-header {
    margin-top: 20px;
    background-color: $green-600;
    border-radius: 15px 15px 0 0;
    padding-top: 100px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .user-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      border: 10px solid $white;
      border-radius: 50%;
      background-color: $gray-200;
      position: absolute;

      img {
        width: 50%;
      }
    }
  }

  .user-information-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;

    .name-and-role {
      display: flex;
      flex-direction: column;
      align-items: center;

      .name {
        font-weight: 500;
        font-size: 28px;
        line-height: 0;
        margin-bottom: 15px;
      }

      span {
        font-size: 16px;
        font-weight: 300;
      }
    }

    .main-user-information {
      width: 70%;
      border-radius: 5px;
      border: 2px solid $gray-300;
      margin-top: 20px;

      .subheader {
        display: flex;
        justify-content: center;
        background: $gray-300;
        padding: 10px 0;
        position: relative;

        img {
          width: 18px;
          margin-left: 10px;
        }

        span {
          color: $green-600;
          font-weight: 600;
          font-size: 16px;
        }
      }

      .information-content {
        display: flex;
        background-color: $white;
        flex-direction: column;
        padding: 20px 20px 30px 20px;

        .single-info-point-block {
          display: flex;
          flex-direction: column;

          .info-item {
            color: $gray-700;
            font-weight: 300;
            font-weight: 12px;
            margin-top: 8px;
          }

          .info-item-content {
            font-weight: 600;
            font-size: 18px;
          }
        }

        .logout-btn {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
