import { defineStore } from "pinia";
import { toFixed } from "@/utils/toFixed";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    payment: "$0",
    paymentNumber: 0,
    selectedCountry: "",
    selectedDeviceReader: "",
    showAlert: false,
    alertMessage: "",
    showEdit: false,
    showCreditCardDetail: false,
    showPayByReader: false,
    maxMerchantProcessingPercentage: 3.5,
    maxTotalFixedFee: 0.1,
    patientCardProcessingFee: 0,
    countryList: [
      {
        id: 48,
        title: "New York Clinic",
        taxRate: "0.04500",
        createdAt: "2024-01-15T12:00:00Z",
        updatedAt: "2024-01-15T12:00:00Z",
        deletedAt: null,
      },
      {
        id: 75,
        title: "Los Angeles Clinic",
        taxRate: "0.04600",
        createdAt: "2024-03-08T12:00:00Z",
        updatedAt: "2024-03-08T12:00:00Z",
        deletedAt: null,
      },
    ],
    readers: [
      {
        id: 23,
        label: "Device Reader 01",
        readerId: "tmr_00000001582624",
        status: "online",
        locationId: 48,
        createdAt: "2024-01-20T12:00:00Z",
        updatedAt: "2024-01-20T12:00:00Z",
        deletedAt: null,
      },
      {
        id: 27,
        label: "Device Reader 02",
        readerId: "tmr_00000001582658",
        status: "offline",
        locationId: 48,
        createdAt: "2024-02-13T12:00:00Z",
        updatedAt: "2024-02-13T12:00:00Z",
        deletedAt: null,
      },
      {
        id: 35,
        label: "Device Reader 03",
        readerId: "tmr_00000001582824",
        status: "online",
        locationId: 48,
        createdAt: "2024-02-21T12:00:00Z",
        updatedAt: "2024-02-21T12:00:00Z",
        deletedAt: null,
      },
      {
        id: 58,
        label: "Device Reader 01",
        readerId: "tmr_00000001604824",
        status: "online",
        locationId: 75,

        createdAt: "2024-03-13T12:00:00Z",
        updatedAt: "2024-03-13T12:00:00Z",
        deletedAt: null,
      },
      {
        id: 63,
        label: "Device Reader 04",
        readerId: "tmr_00000001604858",
        status: "online",
        locationId: 48,
        createdAt: "2024-03-18T12:00:00Z",
        updatedAt: "2024-03-18T12:00:00Z",
        deletedAt: null,
      },
      {
        id: 71,
        label: "Device Reader 02",
        readerId: "tmr_00000001630824",
        status: "online",
        locationId: 75,
        createdAt: "2024-03-25T12:00:00Z",
        updatedAt: "2024-03-25T12:00:00Z",
        deletedAt: null,
      },
    ],
  }),
  actions: {
    showAlertModal(msg) {
      this.showAlert = true;
      this.alertMessage = msg;
    },
    hideAlertModal() {
      this.showAlert = false;
    },
    showEditModal() {
      this.showEdit = true;
    },
    hideEditModal() {
      this.showEdit = false;
    },
    showReaderModal() {
      this.showPayByReader = true;
    },
    hideReaderModal() {
      this.showPayByReader = false;
    },
    showCreditCardModal() {
      this.showCreditCardDetail = true;
    },
    hideCreditCardModal() {
      this.showCreditCardDetail = false;
    },
    onPaymentUpdated(e) {
      const value = e.target.value.replace(/\$/g, ""); // Remove $
      const isCompliance = /^\$\d+(\.\d*)?$/.test(e.target.value);
      if (!isCompliance) {
        const number = e.target.value.match(/\d+(\.\d*)?/g); // Get the number part
        this.payment = number ? `$${number[0]}` : `$`;
        this.paymentNumber = number ? number[0] : 0;
      } else {
        this.paymentNumber = +value;
      }
    },
    resetPayment() {
      this.payment = "$0";
      this.paymentNumber = 0;
      this.patientCardProcessingFee = 0;
    },
    setDefaultCountry() {
      this.selectedCountry = this.countryList[0];
    },
    setDefaultDeviceReader(canUseReaders) {
      for (let index = 0; index < canUseReaders.length; index++) {
        if (canUseReaders[index].status === "online") {
          this.selectedDeviceReader = canUseReaders[index];
          break;
        }
      }
    },
  },
  getters: {
    // calculate tax fee
    taxFee(state) {
      let taxFee = 0;
      let taxRate = 0;
      if (state.selectedCountry) {
        taxRate = state.selectedCountry.taxRate;
        taxFee = +taxRate * state.paymentNumber;
      }
      return toFixed(Math.ceil(taxFee * 100) / 100);
    },
    // Sum of enter amount and tax fee.
    cashTotal(state) {
      return toFixed(
        Math.ceil((this.taxFee + state.paymentNumber) * 100) / 100
      );
    },
    // Filter the Readers that can be used in the country
    canUseReaders(state) {
      let canUseReaders = state.readers.filter((reader) => {
        return reader.locationId === state.selectedCountry.id;
      });
      this.setDefaultDeviceReader(canUseReaders);
      return canUseReaders;
    },
    // Sum of cashTotal and processing fee
    cardTotal(state) {
      return toFixed(this.cashTotal + state.patientCardProcessingFee);
    },
  },
});
