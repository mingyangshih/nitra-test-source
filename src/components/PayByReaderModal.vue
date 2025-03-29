<template>
  <v-dialog
    v-model="paymentStore.showPayByReader"
    max-width="500px"
    class="credit-card-detail"
  >
    <v-card class="rounded-lg">
      <v-card-text class="py-10 px-6">
        <v-img
          :width="200"
          aspect-ratio="16/9"
          class="mx-auto"
          src="../assets/card-payment.png"
        ></v-img>
        <div class="d-flex justify-center align-center mb-2">
          <v-icon class="font-size-md">fa-solid fa-eye</v-icon>
          <span class="ml-2 font-weight-bold font-size-md"
            >Review Details with Patient</span
          >
        </div>
        <div class="font-size-sm text-gray-700 text-center mb-6">
          Review details of this transaction with the customer on the device
          reader. If everything looks good, proceed to process payment.
        </div>
        <div
          class="py-3 bg-teal-50 font-size-sm font-weight-medium text-teal-900 text-center rounded"
        >
          Auto-Processing in {{ countDownValue }}s
        </div>
        <div class="text-gray-700 font-size-xss text-center">
          Or click “Process Payment” below
        </div>
      </v-card-text>
      <v-card-actions class="pa-0 border-t">
        <div class="w-100 d-flex justify-space-between px-6 py-3">
          <v-btn
            variant="text"
            class="text-gray-600 py-2 px-4"
            @click="paymentStore.hideReaderModal()"
            >Cancel</v-btn
          >
          <v-btn
            class="bg-orange-400 py-2 px-4"
            color="white"
            @click="processPayment()"
            >Process Payment</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "Vue";
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
let countDownValue = ref(5);
let timer;

const processPayment = () => {
  paymentStore.hideReaderModal();
};
onMounted(() => {
  timer = setInterval(() => {
    countDownValue.value -= 1;
    if (countDownValue.value === 0) {
      processPayment();
    }
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>
