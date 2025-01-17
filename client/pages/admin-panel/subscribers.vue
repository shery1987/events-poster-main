<script setup>
import Paginate from "vuejs-paginate-next";
import { useAuthStore } from "@/stores/useAuthStore";

definePageMeta({
  layout: "admin-panel",
});

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const authManager = useAuthStore();
const { userInfo } = storeToRefs(authManager);

const dataGeted = ref(false);
const isLoading = ref(true);
const filteredSubscriptions = ref([]);
const currentFilteredSubscribersCollection = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10;
const chunkOfSubscribersView = ref([]);

const numPages = computed(() =>
  Math.ceil(currentFilteredSubscribersCollection.value.length / itemsPerPage)
);

function rewriteChunkOfRequests(pageNum) {
  currentPage.value = pageNum;
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  chunkOfSubscribersView.value =
    currentFilteredSubscribersCollection.value.slice(start, end);
  scrollToTopOfTheTableBody();
}

function scrollToTopOfTheTableBody() {
  const tableElement = document.getElementById("table");
  if (tableElement) {
    tableElement.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
}

watch(currentFilteredSubscribersCollection, () => {
  rewriteChunkOfRequests(1);
});

const { data: allSubscribers, error } = await useFetch(
  `${API_URL}/all-subscriptions`
);

onMounted(() => {
  if (userInfo.value.role !== "admin") {
    navigateTo("my-requests");
  }

  if (allSubscribers.value) {
    filteredSubscriptions.value = allSubscribers.value.filter(
      (event) => !event.approved
    );
    currentFilteredSubscribersCollection.value = filteredSubscriptions.value;
    dataGeted.value = true;
    rewriteChunkOfRequests(1);
  } else if (error.value) {
    console.error("something wrong:", error.value);
  }

  isLoading.value = false;
});

async function deleteSubscription(id) {
  const { data: deleteSubscription, error } = await useFetch(
    `${API_URL}/delete-subscription/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!error.value) {
    filteredSubscriptions.value = filteredSubscriptions.value.filter(
      (event) => event._id !== id
    );
    currentFilteredSubscribersCollection.value =
      currentFilteredSubscribersCollection.value.filter(
        (event) => event._id !== id
      );
    rewriteChunkOfRequests(currentPage.value);
  } else {
    console.log("Error deleting event:", error.value);
  }
}
</script>

<template>
  <div class="admin-content-wrapper">
    <h1>Subscribers</h1>

    <div v-if="isLoading" class="loading-state">
      <p>Loading suggestions...</p>
    </div>
    <div v-else-if="dataGeted && !isLoading" id="table" class="table-wrapper">
      <table id="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Agreement Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="single-request-row"
            v-for="subscription in chunkOfSubscribersView"
            :key="subscription._id"
          >
            <td>{{ subscription.name }}</td>
            <td>{{ subscription.phone }}</td>
            <td>{{ subscription.email }}</td>
            <td>{{ subscription.agreement }}</td>
            <td class="action">
              <div class="action-buttons-wrapper">
                <NuxtImg
                  src="/images/trash.svg"
                  @click="deleteSubscription(subscription._id)"
                  alt="delete"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <paginate
        v-model="currentPage"
        :page-count="numPages"
        :page-range="5"
        :click-handler="rewriteChunkOfRequests"
        :container-class="'pagination'"
        prev-text="<"
        next-text=">"
      />
    </div>
    <div v-else class="no-db-entries-block">
      <p>It seems you haven't any unapproved events yet</p>
      <NuxtLink to="/admin-panel/all-events" class="yellow-btn"
        >Check all events</NuxtLink
      >
    </div>
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

  .no-db-entries-block {
    text-align: center;
    margin-top: 20vh;

    p {
      font-weight: 300;
      font-size: 22px;
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
