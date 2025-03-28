<template>
  <div class="summary font-size-xs">
    <div class="summary-title pa-4 font-weight-bold font-size-md">Summary</div>
    <v-divider color="gray-100" thickness="1" class="opacity-100"></v-divider>
    <div class="pa-4">
      <div class="summary-number mb-0 font-weight-medium">
        <div class="d-flex justify-space-between text-gray-700 px-4 py-3">
          <span>Subtotal</span>
          <span>{{ paymentStore.payment }}</span>
        </div>
        <div class="d-flex justify-space-between text-gray-700 px-4 pt-3 pb-3">
          <span
            >Tax{{
              paymentStore.selectedCountry
                ? `(${paymentStore.selectedCountry.taxRate * 100}%)`
                : ""
            }}</span
          >
          <span>${{ paymentStore.taxFee }}</span>
        </div>
        <v-divider color="teal-700" thickness="1"></v-divider>
        <div class="d-flex justify-space-between text-dark py-6 px-4">
          <span>Total</span>
          <span>${{ paymentStore.cashTotal }}</span>
        </div>
      </div>
      <!-- button group -->
      <div class="summary-action">
        <v-btn-toggle
          v-model="paymentMethod"
          color="teal-100"
          class="w-100 h-auto button-group"
          group
        >
          <v-btn
            size="small"
            value="cash"
            class="w-50 text-teal-700 py-2 rounded-0 border-e font-size-xss"
            ><v-icon class="mr-1">fa-solid fa-sack-dollar</v-icon>Pay by Cash
            ${{ paymentStore.cashTotal }}</v-btn
          >
          <v-btn
            size="small"
            value="card"
            class="w-50 text-teal-700 py-2 rounded-0 font-size-xss"
            ><v-icon class="mr-1">fa-solid fa-credit-card</v-icon>Pay by Card
            $0</v-btn
          >
        </v-btn-toggle>
        <div class="pt-6 d-flex px-4" v-if="paymentMethod === 'card'">
          <span>Patient Card Processing Fee</span>
          <a
            href="javascript:void(0)"
            class="text-teal-400 ml-3"
            @click="paymentStore.showEditModal()"
            >Edit</a
          >
          <span class="ml-auto">$0</span>
        </div>
      </div>
      <v-divider color="teal-700" thickness="1" class="mt-6"></v-divider>
      <div class="pt-6 pb-4 px-4">
        <div class="d-flex align-center" v-if="paymentMethod === 'card'">
          <span class="font-weight-bold">Pay by Card Total</span>
          <span class="font-weight-bold ml-auto font-size-xl text-green-500"
            >$0</span
          >
        </div>
        <div class="d-flex align-center" v-else>
          <span class="font-weight-bold">Pay by Cash Total</span>
          <span
            class="font-weight-bold ml-auto font-size-xl"
            :class="[
              cashCanPay || paymentStore.cashTotal === 0
                ? 'text-green-500'
                : 'text-red-500',
            ]"
            >${{ paymentStore.cashTotal }}</span
          >
        </div>
        <span
          class="text-red-500 font-size-xss font-weight-medium alert"
          v-if="!cashCanPay && paymentStore.cashTotal > 0"
          >*Total amount falls below the required minimum of $0.50</span
        >
      </div>
    </div>
    <v-divider color="gray-200" thickness="1"></v-divider>

    <div class="px-4">
      <nitra-auto-complete
        className="font-size-xs custom-autocomplete font-weight-medium"
        bgColor="#ffffff"
        color="#73838C"
        maxWidth="160px"
        minWidth="160px"
        :items="paymentStore.countryList"
      />
      <v-autocomplete
        label="Device Reader"
        bg-color="#F4F5F6"
        :items="paymentStore.canUseReaders"
        return-object
        item-title="label"
        hide-details
        variant="solo"
        v-if="paymentMethod === 'card'"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :disabled="item.raw.status === 'offline'">
            <template v-slot:prepend>
              <v-icon
                class="bg-gray-400 font-size-md rounded-circle"
                v-if="item.raw.status === 'offline'"
                >fa-regular fa-circle-xmark</v-icon
              >
              <v-icon v-else class="text-green-500 font-size-md"
                >fa-regular fa-circle-dot</v-icon
              >
            </template>
            <!-- <v-list-item-title>Clayton</v-list-item-title> -->
          </v-list-item>
        </template>
      </v-autocomplete>
      <div class="mt-3 py-6">
        <v-btn
          v-if="paymentMethod === 'cash'"
          :disabled="!cashCanPay"
          class="py-2 w-100 bg-orange-400 text-white font-size-sm pay-button"
          prepend-icon="fa-solid fa-money-bill-wave"
        >
          Log Payment
        </v-btn>
        <v-btn
          v-if="paymentMethod === 'card'"
          class="mt-3 py-2 w-100 bg-orange-400 text-white font-size-sm pay-button"
          prepend-icon="fa-solid fa-tablet-screen-button"
        >
          Initiate Payment on Reader
        </v-btn>
        <v-btn
          v-if="paymentMethod === 'card'"
          class="mt-3 py-2 w-100 bg-orange-50 text-orange-400 font-size-sm pay-button"
          prepend-icon="fa-regular fa-credit-card"
        >
          Initiate Payment on Reader
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePaymentStore } from "@/stores/payment";
import { ref, computed } from "vue";
let paymentMethod = ref("cash");
const paymentStore = usePaymentStore();
const cashCanPay = computed(() => {
  if (paymentMethod.value === "cash" && paymentStore.cashTotal > 0.5) {
    return true;
  }
  return false;
});
</script>

<style></style>
