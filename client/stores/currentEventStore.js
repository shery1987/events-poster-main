import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCurrentEventStore = defineStore('current-event-store', () => {
  const currentEvent = ref({});

  return { currentEvent };
});