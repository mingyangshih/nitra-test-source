<template>
  <span class="font-size-xs text-gray-700 text-center">Enter Amount</span>
  <v-text-field
    variant="solo"
    class="custom-text-field h-auto flex-grow-0 w-100"
    :flat="true"
    :center-affix="true"
    @input="paymentStore.onPaymentUpdated"
    hide-details
    v-model="paymentStore.payment"
  />
  <v-textarea
    placeholder="Description (Optional)"
    class="custom-textarea flex-grow-0 text-gray-600"
    variant="solo"
    :width="textareaWidth"
    :flat="true"
    hide-details
  />
</template>
<script setup>
import { usePaymentStore } from "@/stores/payment";
import { useAppStore } from "@/stores/index";
import { computed } from "vue";

const paymentStore = usePaymentStore();
const appStore = useAppStore();

const textareaWidth = computed(() => {
  return appStore.isMdAndUp ? 400 : "100%";
});
</script>
