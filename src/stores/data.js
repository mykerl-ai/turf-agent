//store can be defined similar to the composition API setup, but it doesn't work as expected.
import { defineStore } from "pinia";
import { MUTATE, QUERY } from "../api/index.js";
// import { logout } from "@/api/api";

export const useDataStore = defineStore("main", {
  state: () => ({
    agentHouses: [],
    agentData: {},
    singleAppointment: {},
    appointments: [],
    singleHomeDetail: {},
  }),

  getters: {
    getAgentHouses: (state) => state.agentHouses,
    getAgentData: (state) => state.agentData,
    getAppointments: (state) => state.appointments,
    getSingleAppointment: (state) => state.singleAppointment,
    getSingleHomeDetail: (state) => state.singleHomeDetail,
  },

  actions: {
    // mutate({ endpoint, data, service }) {
    //   return MUTATE(endpoint, data, service);
    // },
    async mutate({ endpoint, data, service }) {
      try {
        const res = await MUTATE(endpoint, data, service);
        console.log(res, "Store");

        if (res) {
          return res;
        }
      } catch (e) {
        console.log(e);
        return e.message;
      }
    },

    async query({ endpoint, payload, service, storeKey }) {
      try {
        const res = await QUERY(endpoint, payload, service, storeKey);
        if (res) {
          this[storeKey] = res;

          return res;
        }
        // else if (res == undefined) {
        //   logout("logout");
        // }
      } catch (e) {
        console.log(e);
        return e;
      }
    },
  },
  persist: true,
});
