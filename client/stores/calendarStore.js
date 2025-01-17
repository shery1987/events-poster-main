import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSelectedDate = defineStore('selected-date-store', () => {
  const selectedDate = ref({});

  return { selectedDate };
});