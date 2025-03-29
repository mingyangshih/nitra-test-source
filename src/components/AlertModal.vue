<template>
  <v-dialog
    v-model="paymentStore.showAlert"
    max-width="500px"
    class="credit-card-detail"
  >
    <v-card class="pt-6 pb-3 rounded-lg">
      <v-card-title class="font-size-2xl py-0 px-6 d-flex align-center mb-6">
        <span class="font-weight-bold">Alert</span>
        <v-btn
          icon
          @click="paymentStore.hideAlertModal()"
          variant="text"
          class="ml-auto px-0"
          size="small"
        >
          <v-icon class="text-gray-300 font-size-2xl">fa-solid fa-xmark</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-6 text-center">
        <span class="font-weight-bold text-red-500 font-size-4xl">{{
          paymentStore.alertMessage
        }}</span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
</script>
