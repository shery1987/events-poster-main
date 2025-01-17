<script setup>
const props = defineProps({
  eventsCollection: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["filtered-events"]);

const filterSubString = ref("");
const currentFilteredEventCollection = ref(props.eventsCollection);

const filterEvents = () => {
  if (filterSubString.value.length <= 2) {
    currentFilteredEventCollection.value = props.eventsCollection;
  } else {
    const filterText = filterSubString.value.toLowerCase();

    currentFilteredEventCollection.value = props.eventsCollection.filter(
      (event) => {
        const eventDate = event.event_date
          ? event.event_date.toLowerCase()
          : "";
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
      }
    );
  }

  emit("filtered-events", currentFilteredEventCollection.value);
};

watch(filterSubString, filterEvents, { immediate: true });
</script>

<template>
  <div class="filter-wrapper">
    <input
      v-model="filterSubString"
      class="input-filter"
      type="search"
      placeholder="Filter"
    />
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  align-items: right;
  margin: 30px 0;

  .input-filter {
    margin-top: 15px;
    width: 280px;
    padding: 5px;
  }
}
</style>
