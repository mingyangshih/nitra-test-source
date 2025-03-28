import { defineStore } from "pinia";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    payment: "$0",
    paymentNumber: 0,
    selectedCountry: "",
    showEdit: false,
    showCreditCardDetail: false,
    showPayByReader: false,
    merchantProcessingPercentage: 0,
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
    showEditModal() {
      this.showEdit = true;
    },
    updatePayment(e) {
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
    },
  },
  getters: {
    taxFee(state) {
      let taxFee = 0;
      let taxRate = 0;
      if (state.selectedCountry) {
        taxRate = state.selectedCountry.taxRate;
        taxFee = +taxRate * state.paymentNumber;
      }
      return +(Math.ceil(taxFee * 100) / 100).toFixed(2);
    },
    cashTotal(state) {
      return (
        Math.ceil((this.taxFee + state.paymentNumber) * 100) / 100
      ).toFixed(2);
    },
    canUseReaders(state) {
      let canUseReaders = state.readers.filter((reader) => {
        return reader.locationId === state.selectedCountry.id;
      });
      return canUseReaders;
    },
  },
});
