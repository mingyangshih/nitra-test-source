<template>
  <div class="d-flex align-center flex-row">
    <p class="text-black font-size-2xl font-weight-bold ma-0">
      Collect Payment
    </p>
    <v-autocomplete
      :items="items"
      class="ml-6 font-size-xs"
      bg-color="#E3E6E8"
      color="black"
      max-width="200px"
      menu-icon="fa-solid fa-angle-down"
      density="compact"
      theme="light"
      variant="solo"
      hide-details
      :flat="true"
      v-model="item"
      @update:modelValue="onSelected"
    >
      <template v-slot:prepend-inner>
        <v-icon size="12">fa-solid fa-location-dot</v-icon>
      </template>
    </v-autocomplete>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
const emit = defineEmits(["onSelected"]);
defineProps({
  items: Array,
});

let item = ref("");
const onSelected = () => {
  emit("onSelected", item.value);
};
</script>

<style>
.v-icon--size-default {
  font-size: 12px !important;
}
</style>
