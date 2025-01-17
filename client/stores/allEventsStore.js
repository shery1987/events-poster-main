
export const useAllEventsStore = defineStore('all-events-store', () => {
  const allEvents = ref([]);
  const currentFilteredEventCollection = ref([]);

  
  
  watch(allEvents, (newVal) => {
    const eventsArray = newVal.value || newVal;

    if (eventsArray.length > 0) {
      allEvents.value = newVal;
    }
  });

  return { allEvents, currentFilteredEventCollection };
});
