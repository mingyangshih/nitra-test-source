<template>
  <v-container class="pa-4 pa-md-6 fill-height" fluid>
    <v-row class="ma-0 fill-height flex-column" no-gutters>
      <v-col class="flex-grow-0 mb-4">
        <CollectPaymentHeader />
      </v-col>
      <v-col class="rounded-lg flex-grow-1 collect-payment-body">
        <v-row class="fill-height flex-md-row flex-column" no-gutters>
          <v-col
            xs="12"
            md="9"
            class="enter-amount d-flex flex-column align-center fill-height"
          >
            <EnterAmount />
          </v-col>
          <v-col md="3" xs="12">
            <Summary />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <NitraEditMerchantModal />
    <CreditCardDetailModal />
    <template v-if="paymentStore.showPayByReader">
      <PayByReaderModal />
    </template>

    <AlertModal />
  </v-container>
</template>

<script setup>
import { onMounted } from "vue";
import { usePaymentStore } from "@/stores/payment";
const paymentStore = usePaymentStore();
onMounted(() => {
  paymentStore.setDefaultCountry();
});
</script>
