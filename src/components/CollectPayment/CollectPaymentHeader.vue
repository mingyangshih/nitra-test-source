<template>
  <div class="d-flex align-center flex-column flex-md-row align-center">
    <div
      class="text-black font-size-2xl font-weight-bold ma-0 collect-payment-header"
    >
      Collect Payment
      <v-btn
        v-if="paymentStore.paymentNumber && !appStore.isMdAndUp"
        variant="text"
        class="ml-auto text-red-400"
        @click="onReset"
        >Reset Payment</v-btn
      >
    </div>
    <nitra-auto-complete
      className="ml-md-6 font-size-xs custom-autocomplete font-weight-medium"
      bgColor="#E3E6E8"
      color="black"
      :maxWidth="appStore.isMdAndUp ? '190px' : '100%'"
      :minWidth="appStore.isMdAndUp ? '190px' : '100%'"
      :items="paymentStore.countryList"
    />
    <v-btn
      v-if="paymentStore.paymentNumber && appStore.isMdAndUp"
      variant="text"
      class="ml-md-auto text-red-400"
      @click="onReset"
      >Reset Payment</v-btn
    >
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/index";
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
const appStore = useAppStore();
const props = defineProps({
  modelValue: String,
});

const onReset = () => {
  paymentStore.resetPayment();
};
</script>
