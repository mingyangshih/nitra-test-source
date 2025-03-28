<template>
  <div class="d-flex align-center flex-column flex-md-row align-center">
    <p class="text-black font-size-2xl font-weight-bold ma-0">
      Collect Payment
    </p>
    <nitra-auto-complete
      className="ml-md-6 font-size-xs custom-autocomplete font-weight-medium"
      bgColor="#E3E6E8"
      color="black"
      maxWidth="190px"
      minWidth="190px"
      :items="paymentStore.countryList"
    />
    <v-btn
      v-if="paymentStore.paymentNumber"
      variant="text"
      class="ml-md-auto text-red-400"
      @click="onReset"
      >Reset Payment</v-btn
    >
  </div>
</template>

<script setup>
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
const props = defineProps({
  modelValue: String,
});

const onReset = () => {
  paymentStore.resetPayment();
};
</script>
