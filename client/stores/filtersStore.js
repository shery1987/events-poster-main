import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterDataStore = defineStore('filter-data-store', () => {
  const currentFilter = ref("");
  const filterSubString = ref("");


  return { currentFilter, filterSubString };
});