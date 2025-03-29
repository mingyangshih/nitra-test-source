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
          @click="paymentStore.hideEditModal()"
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
              v-model="merchantProcessingPercentage"
              thumb-label
              min="0"
              :max="maxPercentage"
              color="#4A979B"
              thumb-color="#ffffff"
              show-ticks="always"
              :step="0.01"
              :ticks="[0, maxPercentage]"
              :tick-labels="tickLabels"
            >
              <template v-slot:thumb-label="{ modelValue }">
                <div class="font-size-sm font-weight-medium text-gray-900">
                  {{ modelValue.toFixed(2) }}%
                </div>
                <!-- need calculated -->
                <span class="text-gray-700 font-size-xss font-weight-regular"
                  >${{ (paymentStore.paymentNumber * modelValue) / 100 }}</span
                >
              </template>
              <template v-slot:tick-label="{ index }">
                <span
                  :class="
                    merchantProcessingPercentage === index ? 'active-label' : ''
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
              max-width="87"
              type="number"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="merchantProcessingPercentage"
            >
              <template v-slot:append-inner>
                <span class="text-gray-700 font-size-sm">%</span>
              </template>
            </v-text-field>
            <span class="text-gray-700 font-size-xss font-weight-regular ms-0"
              >/{{ maxPercentage }}%</span
            >
            <v-icon
              class="text-gray-700 font-size-xss ml-1 font-weight-bold"
              icon="fa-solid fa-plus"
            ></v-icon>
            <v-text-field
              class="font-weight-bold flex-grow-0 font-size-md"
              min-width="82"
              max-width="82"
              type="number"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="fixedMerchantProcessingFee"
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
              max-width="87"
              type="number"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="patientProcessingPercentage"
              @input="onPatientProcessingPercentageChange"
            >
              <template v-slot:append-inner>
                <span class="text-gray-700 font-size-sm">%</span>
              </template>
            </v-text-field>
            <span class="text-gray-700 font-size-xss font-weight-regular ms-0"
              >/{{ maxPercentage }}%</span
            >
            <v-icon
              class="text-gray-700 font-size-xss ml-1 font-weight-bold"
              icon="fa-solid fa-plus"
            ></v-icon>
            <v-text-field
              class="font-weight-bold flex-grow-0 font-size-md"
              min-width="82"
              max-width="82"
              type="number"
              variant="solo"
              hide-details
              density="compact"
              :flat="true"
              bg-color="rgba(235, 238, 239, 0.93)"
              color="#000"
              v-model="fixedPatientProcessingFee"
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
            @click="resetPatientProcessingFee()"
            class="set-to-zero text-center font-size-xs font-weight-medium text-teal-400 text-decoration-underline cursor-pointer"
          >
            Set patient processing fee to 0
          </div>
          <div class="font-size-sm font-weight-bold w-100 text-justify">
            On this {{ paymentStore.payment }} transaction, you pay ${{
              merchantFee
            }}, and patient pays ${{ patientFee }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="pa-0 mt-9" min-height="auto">
        <div class="w-100 d-flex justify-space-between">
          <v-btn
            variant="text"
            class="text-gray-600 py-2 px-4"
            @click="paymentStore.hideEditModal()"
            >Cancel</v-btn
          >
          <v-btn
            class="bg-orange-400 py-2 px-4"
            color="white"
            @click="updatePatientCardProcessingFee()"
            >Update</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { usePaymentStore } from "@/stores/payment";
import { toFixed } from "@/utils/toFixed";
const paymentStore = usePaymentStore();
let maxPercentage = paymentStore.maxMerchantProcessingPercentage;
let maxFixedFee = paymentStore.maxFixedFee;
let merchantProcessingPercentage = ref(0);
let patientProcessingPercentage = ref(0);
let fixedMerchantProcessingFee = ref(0);
let fixedPatientProcessingFee = ref(0);
let tickLabels = ref(["0%", maxPercentage]);
// Calculate patient processing percentage when merchantProcessingPercentage changed.
watch(merchantProcessingPercentage, (newValue, oldValue) => {
  if (newValue === oldValue) return;
  if (newValue > maxPercentage) {
    merchantProcessingPercentage.value = maxPercentage;
  }
  if (newValue < 0) {
    merchantProcessingPercentage.value = 0;
  }
  patientProcessingPercentage.value = toFixed(
    maxPercentage - merchantProcessingPercentage.value
  );
});
// Calculate merchant processing percentage when patientProcessingPercentage changed.
const onPatientProcessingPercentageChange = (e) => {
  let inputValue = +e.target.value;
  if (inputValue > maxPercentage) {
    patientProcessingPercentage.value = maxPercentage;
  }
  if (inputValue < 0) {
    patientProcessingPercentage.value = 0;
  }
  merchantProcessingPercentage.value =
    maxPercentage - patientProcessingPercentage.value;
};
watch(fixedMerchantProcessingFee, (newValue, oldValue) => {
  if (newValue === oldValue) return;
  if (newValue > maxFixedFee) {
    fixedMerchantProcessingFee.value = maxFixedFee;
  }
  if (newValue < 0) {
    fixedMerchantProcessingFee.value = 0;
  }
});
watch(fixedPatientProcessingFee, (newValue, oldValue) => {
  if (newValue === oldValue) return;
  if (+newValue > maxFixedFee) {
    fixedPatientProcessingFee.value = maxFixedFee;
  }
  if (newValue < 0) {
    fixedPatientProcessingFee.value = 0;
  }
});
// Calculate merchant fee
const merchantFee = computed(() => {
  let merchantFee = toFixed(
    (paymentStore.paymentNumber * merchantProcessingPercentage.value) / 100 +
      +fixedMerchantProcessingFee.value
  );
  return merchantFee;
});
// Calculate patient fee
const patientFee = computed(() => {
  let patientFee = toFixed(
    (paymentStore.paymentNumber * patientProcessingPercentage.value) / 100 +
      +fixedPatientProcessingFee.value
  );
  return patientFee;
});
// Reset Patient Processing Fee
const resetPatientProcessingFee = () => {
  patientProcessingPercentage.value = 0;
  fixedPatientProcessingFee.value = 0;
  merchantProcessingPercentage.value = maxPercentage;
};
// Update Patient Card Processing Fee
const updatePatientCardProcessingFee = () => {
  paymentStore.patientCardProcessingFee = toFixed(
    patientFee.value + merchantFee.value
  );
  paymentStore.hideEditModal();
};
</script>
