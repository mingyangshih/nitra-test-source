import { defineStore } from "pinia";
import { useDisplay } from "vuetify";
export const useAppStore = defineStore("app", {
  getters: {
    // Check the break point
    isMdAndUp() {
      const { mdAndUp } = useDisplay();
      return mdAndUp.value;
    },
  },
});
