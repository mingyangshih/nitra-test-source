<template>
  <v-autocomplete
    :items="items"
    :class="className"
    :bg-color="bgColor"
    :color="color"
    :max-width="maxWidth"
    :min-width="minWidth"
    menu-icon="fa-solid fa-angle-down"
    density="compact"
    theme="light"
    variant="solo"
    hide-details
    :flat="true"
    return-object
    v-model="paymentStore.selectedCountry"
  >
    <template v-slot:prepend-inner>
      <v-icon size="12" class="text-gray-600">fa-solid fa-location-dot</v-icon>
    </template>
  </v-autocomplete>
</template>
<script setup>
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
const props = defineProps({
  className: String,
  bgColor: String,
  color: String,
  maxWidth: String,
  minWidth: String,
  items: Array,
});
</script>
