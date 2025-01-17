<script setup>
import { filtersData } from "~/utils/filters-data";
import { useAllEventsStore } from "~/stores/allEventsStore";
import { useFilterDataStore } from "~/stores/filtersStore";

const { filterSubString } = storeToRefs(useFilterDataStore());
const { allEvents, currentFilteredEventCollection } = storeToRefs(
  useAllEventsStore()
);

const filterEvents = () => {
  if (filterSubString.value.length <= 2) {
    currentFilteredEventCollection.value = allEvents.value;
  } else {
    const filterText = filterSubString.value.toLowerCase();

    currentFilteredEventCollection.value = allEvents.value.filter((event) => {
      const eventDate = event.event_date ? event.event_date.toLowerCase() : "";
      const location = event.location ? event.location.toLowerCase() : "";
      const eventTitle = event.event_title
        ? event.event_title.toLowerCase()
        : "";
      const eventDescription = event.event_description
        ? event.event_description.toLowerCase()
        : "";

      return (
        eventDate.includes(filterText) ||
        location.includes(filterText) ||
        eventTitle.includes(filterText) ||
        eventDescription.includes(filterText)
      );
    });
  }
};

watch(filterSubString, filterEvents, { immediate: true });

const updateCurrentFilter = (filter) => {
  console.log(filter);
  if (filter === "הכל") {
    currentFilteredEventCollection.value = [];
    filterSubString.value = "";
  }
};
</script>

<template>
  <div class="filter-wrapper">
    <div class="filters">
      <span
        v-for="filter in filtersData"
        :key="filter"
        class="single-filter"
        @click="updateCurrentFilter(filter)"
        >{{ filter }}</span
      >
    </div>
    <span>מצא אירוע</span>
    <input
      v-model="filterSubString"
      class="input-filter"
      type="search"
      placeholder="הקלד מילות חיפוש"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.filter-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 55px 0;

  span {
    margin-left: 24px;
    font-size: 32px;

    @media (max-width: 1280px) {
      font-size: 22px;
      color: $black;
    }
  }

  .filters {
    .single-filter {
      display: inline-block;
      padding: 5px 10px;
      cursor: pointer;
      box-sizing: border-box;
      border: 2px solid transparent;

      &:hover {
        transition: border-color 0.6s ease;
        border: 2px solid $blue-200;
      }
    }

    .active {
      transition: border-color 0.6s ease;
      border: 2px solid $blue-200;
      color: $blue-200;
    }
  }

  .input-filter {
    border: 1px solid $gray-850;
    font-size: 14px;
    color: $gray-850;
    border-radius: 100px;
    width: 40%;
    padding: 10px;
    text-align: center;

    &::placeholder {
      color: $gray-850;
      margin: 0 auto;
    }

    @media (max-width: 1280px) {
      width: 40%;
    }

    @media (max-width: 768px) {
      width: 60%;
    }
  }
}
</style>
