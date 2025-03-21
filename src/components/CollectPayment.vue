<template>
  <v-container class="pa-6 custom-container fill-height">
    <v-row class="ma-0 fill-height flex-column" no-gutters>
      {{ selectedCountry }}
      <v-col class="flex-grow-0 mb-4">
        <CollectPaymentHeader :items="items" @onSelected="onSelected" />
      </v-col>
      <v-col class="border border-primary rounded-lg flex-grow-1"> </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from "vue";
let items = reactive([
  {
    id: 48,
    title: "New York Clinic",
    taxRate: "0.04500",
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
    deletedAt: null,
  },
  {
    id: 75,
    title: "Los Angeles Clinic",
    taxRate: "0.04500",
    createdAt: "2024-03-08T12:00:00Z",
    updatedAt: "2024-03-08T12:00:00Z",
    deletedAt: null,
  },
]);
let selectedCountry = ref("");
let test = ref(0);
const onSelected = (item) => {
  selectedCountry.value = item;
};
</script>
<style scoped>
.custom-container {
  /* max-width: var(--v-container-max-width-xl); */
}
</style>
