<template>
  <v-dialog
    v-model="paymentStore.showCreditCardDetail"
    max-width="500px"
    class="credit-card-detail"
  >
    <v-card class="pt-6 pb-3 rounded-lg">
      <v-card-title class="font-size-2xl py-0 px-6 d-flex align-center mb-6">
        <span class="font-weight-bold">Credit Card Details</span>
        <v-btn
          icon
          @click="paymentStore.showCreditCardDetail = false"
          variant="text"
          class="ml-auto px-0"
          size="small"
        >
          <v-icon class="text-gray-300 font-size-2xl">fa-solid fa-xmark</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="py-0 px-6">
        <v-container class="pa-0">
          <v-row class="ma-0">
            <v-col cols="12" md="12" class="pa-0 mb-3"
              ><v-text-field
                label="Name on Card"
                class="font-weight-medium text-gray-600 opacity-100"
                hide-details
                variant="solo"
                :flat="true"
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="12" class="pa-0 mb-3">
              <v-text-field
                label="Card Number"
                class="font-weight-medium text-gray-600 opacity-100"
                hide-details
                variant="solo"
                :flat="true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pe-0 pe-md-3 ps-0 py-0 mb-3">
              <v-text-field
                label="Expiration Date"
                class="font-weight-medium text-gray-600 opacity-100"
                hide-details
                variant="solo"
                :flat="true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 mb-3">
              <v-text-field
                label="CVC"
                class="font-weight-medium text-gray-600 opacity-100"
                hide-details
                variant="solo"
                :flat="true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pe-0 pe-md-3 ps-0 py-0 mb-3 mb-md-0">
              <v-combobox
                label="Country"
                :items="['United States']"
                variant="solo"
                menu-icon="fa-solid fa-angle-down"
                :flat="true"
                hide-details
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6" class="pa-0 mb-md-0">
              <v-text-field
                label="ZIP"
                class="font-weight-medium text-gray-600 opacity-100"
                hide-details
                variant="solo"
                :flat="true"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pa-0 mt-6 border-t">
        <div class="w-100 d-flex justify-space-between px-6 pt-3">
          <v-btn variant="text" class="text-gray-600 py-2 px-4">Cancel</v-btn>
          <v-btn
            class="bg-orange-400 py-2 px-4"
            color="white"
            @click="paymentStore.showCreditCardDetail = false"
            >Update</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
let tickLabels = ref(["0%", "3.5%"]);
</script>
