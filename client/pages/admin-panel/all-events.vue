<script setup>
import EventFilter from "~/components/common-components/EventFilter.vue";
import { useAuthStore } from "@/stores/useAuthStore";

definePageMeta({
  layout: "admin-panel",
});

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const authManager = useAuthStore();
const { userInfo } = storeToRefs(authManager);
import Paginate from "vuejs-paginate-next";

const dataGeted = ref(false);
const isLoading = ref(true);
const eventEditing = ref(false);
const editingEventId = ref(null);

const { data: allEvents, error } = await useFetch(`${API_URL}/all-events`);
const currentFilteredEventCollection = ref([]);

const currentPage = ref(1);
const chunkOfRequestsForView = ref([]);

const numPages = computed(() => {
  return currentFilteredEventCollection.value.length / 10;
});

function rewriteChunkOfRequests(pageNum) {
  currentPage.value = pageNum;

  if (currentPage.value === 1) {
    chunkOfRequestsForView.value = currentFilteredEventCollection.value.slice(
      0,
      10
    );
  } else {
    chunkOfRequestsForView.value = currentFilteredEventCollection.value.slice(
      currentPage.value * 10 - 10,
      currentPage.value * 10
    );
  }
  scrollToTopOfTheTableBody();
}

function scrollToTopOfTheTableBody() {
  document.getElementById("table").scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

watch(currentFilteredEventCollection, () => {
  chunkOfRequestsForView.value = currentFilteredEventCollection.value.slice(
    0,
    10
  );
});

const updateFilteredEvents = (filteredEvents) => {
  currentFilteredEventCollection.value = filteredEvents;
};

onMounted(() => {
  if (userInfo.value.role !== "admin") {
    navigateTo("my-requests");
  }

  if (allEvents.value) {
    dataGeted.value = true;
    currentFilteredEventCollection.value = allEvents.value;
    chunkOfRequestsForView.value = currentFilteredEventCollection.value.slice(
      0,
      10
    );
  } else if (error.value) {
    console.error("something wrong:" + error.value);
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
    allEvents.value = allEvents.value.filter((event) => event._id !== id);
    currentFilteredEventCollection.value =
      currentFilteredEventCollection.value.filter((event) => event._id !== id);
  } else {
    console.log("Error deleting user:", error.value);
  }
}

function editEvent(eventId) {
  editingEventId.value = eventId;
  eventEditing.value = true;
}
</script>

<template>
  <div v-if="!eventEditing" class="admin-content-wrapper">
    <h1>All Events</h1>
    <EventFilter
      v-if="!isLoading"
      :events-collection="allEvents"
      @filtered-events="updateFilteredEvents"
    />

    <div v-if="isLoading" class="loading-state">
      <p>Loading suggestions...</p>
    </div>
    <div v-else-if="dataGeted && !isLoading">
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
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="single-request-row"
            v-for="event in chunkOfRequestsForView"
            :key="event._id"
          >
            <td>{{ event.event_title }}</td>
            <td>{{ event.location }}</td>
            <td class="limited-view-column">{{ event.event_description }}</td>
            <td class="limited-view-column">
              <NuxtLink :to="event.event_page" target="blank">{{
                event.event_page
              }}</NuxtLink>
            </td>
            <td>{{ event.event_date }}</td>
            <td>{{ event.event_time }}</td>
            <td>{{ event.email }}</td>
            <td>{{ event.phone }}</td>
            <td class="status">
              <span
                :class="
                  event.approved ? 'approved-status' : 'unapproved-status'
                "
              >
                {{ event.approved ? "Yes" : "No" }}
              </span>
            </td>
            <td class="action">
              <div class="action-buttons-wrapper">
                <NuxtImg
                  src="/images/pencil.svg"
                  @click="editEvent(event._id)"
                  alt="edit"
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
  <CreateUpdateEventForm v-else :event-id="editingEventId" />
</template>

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

  .filter-wrapper {
    align-items: right;
    margin: 30px 0;

    .input-filter {
      margin-top: 15px;
      width: 280px;
      padding: 5px;
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
    width: inherit;
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
            max-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          a {
            color: $blue-100;
          }

          &.status {
            text-align: center;

            .approved-status,
            .unapproved-status {
              padding: 2px 10px;
              border-radius: 2px;
              font-weight: 500;
            }

            .approved-status {
              background-color: $blue-200;
              color: $blue-800;
            }

            .unapproved-status {
              background-color: $red-600;
              color: $coral;
            }
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
