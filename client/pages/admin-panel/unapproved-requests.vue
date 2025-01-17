<script setup>
import EventFilter from "~/components/common-components/EventFilter.vue";
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
const filteredUnaprovedEvents = ref([]);
const currentFilteredEventCollection = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10;
const chunkOfRequestsForView = ref([]);

const numPages = computed(() =>
  Math.ceil(currentFilteredEventCollection.value.length / itemsPerPage)
);

function rewriteChunkOfRequests(pageNum) {
  currentPage.value = pageNum;
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  chunkOfRequestsForView.value = currentFilteredEventCollection.value.slice(
    start,
    end
  );
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

watch(currentFilteredEventCollection, () => {
  rewriteChunkOfRequests(1);
});

const updateFilteredEvents = (filteredEvents) => {
  currentFilteredEventCollection.value = filteredEvents;
};

const { data: unapprovedRequests, error } = await useFetch(
  `${API_URL}/all-events`
);

onMounted(() => {
  if (userInfo.value.role !== "admin") {
    navigateTo("my-requests");
  }

  if (unapprovedRequests.value) {
    filteredUnaprovedEvents.value = unapprovedRequests.value.filter(
      (event) => !event.approved
    );
    currentFilteredEventCollection.value = filteredUnaprovedEvents.value;
    dataGeted.value = true;
    rewriteChunkOfRequests(1);
  } else if (error.value) {
    console.error("something wrong:", error.value);
  }

  isLoading.value = false;
});

async function deleteEvent(id) {
  const { data: deleteEvent, error } = await useFetch(
    `${API_URL}/delete-event/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!error.value) {
    filteredUnaprovedEvents.value = filteredUnaprovedEvents.value.filter(
      (event) => event._id !== id
    );
    currentFilteredEventCollection.value =
      currentFilteredEventCollection.value.filter((event) => event._id !== id);
    rewriteChunkOfRequests(currentPage.value);
  } else {
    console.log("Error deleting event:", error.value);
  }
}

async function approveEvent(id) {
  const { data: approveEvent, error } = await useFetch(
    `${API_URL}/approve-event/${id}`,
    {
      method: "PUT",
    }
  );

  if (!error.value) {
    filteredUnaprovedEvents.value = filteredUnaprovedEvents.value.filter(
      (event) => event._id !== id
    );
    currentFilteredEventCollection.value =
      currentFilteredEventCollection.value.filter((event) => event._id !== id);
    rewriteChunkOfRequests(currentPage.value);
  } else {
    console.log("Error approving event:", error.value);
  }
}
</script>

<template>
  <div class="admin-content-wrapper">
    <h1>Unapproved Events</h1>

    <EventFilter
      v-if="dataGeted && !isLoading"
      :events-collection="filteredUnaprovedEvents"
      @filtered-events="updateFilteredEvents"
    />

    <div v-if="isLoading" class="loading-state">
      <p>Loading suggestions...</p>
    </div>
    <div v-else-if="dataGeted && !isLoading" id="table" class="table-wrapper">
      <table id="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Description</th>
            <th>Event Page</th>
            <th>Date</th>
            <th>Time</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="single-request-row"
            v-for="event in chunkOfRequestsForView"
            :key="event._id"
          >
            <td class="limited-view-column">{{ event.event_title }}</td>
            <td>{{ event.location }}</td>
            <td class="limited-view-column">{{ event.event_description }}</td>
            <td class="limited-view-column">
              <NuxtLink :to="event.event_page" target="_blank">{{
                event.event_page
              }}</NuxtLink>
            </td>
            <td>{{ event.event_date }}</td>
            <td>{{ event.event_time }}</td>
            <td class="limited-view-column">{{ event.email }}</td>
            <td>{{ event.phone }}</td>
            <td class="action">
              <div class="action-buttons-wrapper">
                <NuxtImg
                  src="/images/validation.svg"
                  @click="approveEvent(event._id)"
                  alt="approve"
                />
                <NuxtImg
                  src="/images/trash.svg"
                  @click="deleteEvent(event._id)"
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
