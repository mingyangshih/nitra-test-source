<template>
  <v-dialog
    v-model="paymentStore.showEdit"
    max-width="500px"
    class="process-fee-modal"
  >
    <v-card class="pa-6 rounded-lg">
      <v-card-title class="font-size-2xl pa-0 d-flex align-center">
        <span class="font-weight-bold">Edit Merchant Processing Fee</span>
        <v-btn
          icon
          @click="paymentStore.showEdit = false"
          variant="text"
          class="ml-auto px-0"
        >
          <v-icon class="text-gray-300 font-size-2xl">fa-solid fa-xmark</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <span class="font-size-xs text-gray-700 font-weight-medium"
          >Only applies to this transaction</span
        >
        <div class="mt-3">
          <div class="slider px-5">
            <v-slider
              v-model="paymentStore.merchantProcessingPercentage"
              thumb-label
              min="0"
              max="3.5"
              color="#4A979B"
              thumb-color="#ffffff"
              show-ticks="always"
              :step="0.01"
              :ticks="[0, 3.5]"
              :tick-labels="tickLabels"
            >
              <template v-slot:thumb-label="{ modelValue }">
                <div class="font-size-sm font-weight-medium text-gray-900">
                  {{ modelValue }}%
                </div>
                <!-- need calculated -->
                <span class="text-gray-700 font-size-xss font-weight-regular"
                  >$0.25</span
                >
              </template>
              <template v-slot:tick-label="{ index }">
                <span
                  :class="
                    paymentStore.merchantProcessingPercentage === index
                      ? 'active-label'
                      : ''
                  "
                >
                  {{ tickLabels[index] }}
                </span>
              </template>
            </v-slider>
          </div>
          <v-divider class="my-4"></v-divider>
          <!-- Merchant Processing Fee -->
          <div
            class="processing-fee-result d-flex align-center justify-space-between"
          >
            <span class="font-weight-medium font-size-sm text-gray-900"
              >Merchant processing fee</span
            >
            <v-text-field
              class="font-weight-bold flex-grow-0 font-size-md"
              min-width="87"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="paymentStore.merchantProcessingPercentage"
            >
              <template v-slot:append-inner>
                <span class="text-gray-700 font-size-sm">%</span>
              </template>
            </v-text-field>
            <span class="text-gray-700 font-size-xss font-weight-regular ms-0"
              >/3.5%</span
            >
            <v-icon
              class="text-gray-700 font-size-xss ml-1 font-weight-bold"
              icon="fa-solid fa-plus"
            ></v-icon>
            <v-text-field
              class="font-weight-bold flex-grow-0 font-size-md"
              min-width="82"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="paymentStore.merchantProcessingPercentage"
            >
              <template v-slot:prepend-inner>
                <span class="text-gray-700 font-size-sm">$</span>
              </template>
            </v-text-field>
            <span class="text-gray-700 font-size-xss font-weight-regular ms-0"
              >/$0.10</span
            >
          </div>
          <!-- Patient Processing Fee -->
          <div
            class="processing-fee-result d-flex align-center justify-space-between pt-0 py-3"
          >
            <span class="font-weight-medium font-size-sm text-gray-900"
              >Patient processing fee</span
            >
            <v-text-field
              class="font-weight-bold flex-grow-0 font-size-md"
              min-width="87"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="paymentStore.merchantProcessingPercentage"
            >
              <template v-slot:append-inner>
                <span class="text-gray-700 font-size-sm">%</span>
              </template>
            </v-text-field>
            <span class="text-gray-700 font-size-xss font-weight-regular ms-0"
              >/3.5%</span
            >
            <v-icon
              class="text-gray-700 font-size-xss ml-1 font-weight-bold"
              icon="fa-solid fa-plus"
            ></v-icon>
            <v-text-field
              class="font-weight-bold flex-grow-0 font-size-md"
              min-width="82"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="paymentStore.merchantProcessingPercentage"
            >
              <template v-slot:prepend-inner>
                <span class="text-gray-700 font-size-sm">$</span>
              </template>
            </v-text-field>
            <span class="text-gray-700 font-size-xss font-weight-regular ms-0"
              >/$0.10</span
            >
          </div>
          <!-- Reset Patient Processing Fee -->
          <div
            class="set-to-zero text-center font-size-xs font-weight-medium text-teal-400 text-decoration-underline cursor-pointer"
          >
            Set patient processing fee to 0
          </div>
          <div
            class="font-size-sm font-weight-bold w-100 d-flex justify-space-between"
          >
            On this $25.00 transaction, you pay $0.32, and patient pays $0.71
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-0 mt-9" min-height="auto">
        <div class="w-100 d-flex justify-space-between">
          <v-btn variant="text" class="text-gray-600 py-2 px-4">Cancel</v-btn>
          <v-btn
            class="bg-orange-400 py-2 px-4"
            color="white"
            @click="paymentStore.showEdit = false"
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
