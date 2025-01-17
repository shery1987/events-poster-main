<script setup>
import { useAuthStore } from "@/stores/useAuthStore";

definePageMeta({
  layout: "admin-panel",
});

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const authManager = useAuthStore();
const { userInfo } = storeToRefs(authManager);
const bunnerCreating = ref(false);
const formButtonClicked = ref(false);

const bannerData = ref({
  title: "",
  description: "",
  img: "",
});

const { data: banners } = await useFetch(`${API_URL}/all-banners`);

async function createBanner() {
  formButtonClicked.value = true;

  try {
    console.log(bannerData.value);
    const { data: newBannerRequest, error } = await useFetch(
      `${API_URL}/create-banner`,
      {
        method: "POST",
        body: JSON.stringify(bannerData.value),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (newBannerRequest.value) {
      bannerData.value = {};

      bunnerCreating.value = false;
    } else if (error.value) {
      console.log("something went wrong:", error.value);
    }
  } catch (err) {
    console.error("Error creating event:", err);
  }
}

async function deleteBanner(id) {
  const { data: deleteBanner, error } = await useFetch(
    `${API_URL}/delete-banner/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!error.value) {
    banners.value = banners.value.filter((banner) => banner._id !== id);
  } else {
    console.log("Error deleting user:", error.value);
  }
}
</script>

<template>
  <div class="admin-content-wrapper">
    <h1>Banners</h1>

    <div v-if="bunnerCreating === false" id="table" class="table-wrapper">
      <table id="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="banner in banners"
            :key="banner._id"
            class="single-request-row"
          >
            <td>{{ banner.title }}</td>
            <td>{{ banner.description }}</td>
            <td>{{ banner.img }}</td>
            <td class="action">
              <div class="action-buttons-wrapper">
                <NuxtImg
                  src="/images/trash.svg"
                  @click="deleteBanner(banner._id)"
                  alt="delete"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="banner-form-wpaper">
      <div class="banner-form">
        <h1>New Banner</h1>
        <input
          type="text"
          v-model="bannerData.title"
          placeholder="Banner title"
        />
        <input
          type="text"
          v-model="bannerData.description"
          placeholder="Banner description"
        />
        <input type="text" v-model="bannerData.img" placeholder="Img Url" />

        <button class="blue-btn" @click.prevent="createBanner">
          Create banner
        </button>
      </div>
    </div>

    <span v-if="!bunnerCreating" class="gray-btn" @click="bunnerCreating = true"
      >Create banner</span
    >
  </div>
</template>

<style>
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-top: 20px;
}
</style>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.admin-content-wrapper {
  width: 100%;
  padding: 0 8px 60px 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 834px) {
    margin: 20px 0 150px 0;
  }

  h1 {
    font-size: 30px;
    font-weight: 500;

    @media (max-width: 834px) {
      font-size: 25px;
    }

    @media (max-width: 382px) {
      font-size: 22px;
    }
  }

  .gray-btn {
    width: 30%;
    margin-top: 20px;
  }

  .no-db-entries-block {
    text-align: center;
    margin-top: 20vh;

    p {
      font-weight: 300;
      font-size: 22px;
    }
  }

  .banner-form-wpaper {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: 100%;
    }

    h1 {
      font-size: 48px;
      color: $black-1000;
      margin: 0 0 10px 0;
      font-weight: 300;

      @media (max-width: 1440px) {
        font-size: 48px;
      }

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    .banner-form {
      margin: 50px auto;
      width: 70%;
      padding: 40px 0;
      background-color: $light-gray;
      border-radius: 30px;
      text-align: center;

      @media (max-width: 1440px) {
        padding: 30px 100px;
      }

      @media (max-width: 768px) {
        width: 100%;
        padding: 40px 0;
        border-radius: 0;
      }

      input {
        margin-bottom: 12px;
        border-radius: 30px;
        border: 1px solid $gray-paragraph;
        width: 100%;
        padding: 20px 60px;
        color: $gray-paragraph;
        font-size: 14px;
        background-color: $white;

        @media (max-width: 768px) {
          width: 95%;
          padding: 15px 40px;
        }
      }

      .input-error-notification {
        float: left;
      }
    }

    .blue-btn {
      font-weight: 300;
      font-size: 14px;
      margin: 30px auto 0 auto;
      padding: 18px 0;
      border-radius: 100px;
      background: linear-gradient(90deg, $blue 0%, $purple 100%);
      width: 60%;
      color: $white;
      transition: transform 0.2s;

      @media (max-width: 768px) {
        width: 300px;
        padding: 15px 0;
        margin: 15px auto 0 auto;
      }
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      background-color: $gray-850;

      tr:first-child th:first-child {
        border-top-right-radius: 5px;
      }

      tr:first-child th:last-child {
        border-top-left-radius: 5px;
      }

      th {
        color: white;
        padding: 5px;
        background-color: $gray-850;
        text-align: left;
      }
    }

    tbody {
      background-color: $white;

      tr {
        td {
          padding: 5px;
          border: 1px solid $gray-850;

          &.limited-view-column {
            max-width: 100px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          a {
            color: $blue-100;
          }
        }

        .action {
          padding: 8px;

          .action-buttons-wrapper {
            display: flex;
            justify-content: space-between;

            img {
              width: 18px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
