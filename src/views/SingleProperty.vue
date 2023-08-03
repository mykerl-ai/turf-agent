<template>
  <main class="w-full">
    <div class="flex justify-between w-full bg-secondary px-16 pb-4 text-xs">
      <div class="flex gap-8">
        <div class="-mb-80 mt-12">
          <img
            v-if="!singleHouse.fileUrl.length"
            class="h-11/12 w-96 bg-contain"
            src="@/assets/img/house-3.png"
            alt=""
          />
          <img
            v-else
            class="h-11/12 w-96 bg-contain"
            :src="singleHouse.fileUrl[0]"
            alt=""
          />

          <p class="text-secondary text-left my-4">Current Status</p>

          <div class="flex justify-between items-center">
            <p class="capitalize text-xs text-error font-bold text-left">
              {{ singleHouse.statusType }}
            </p>

            <button
              class="focus:outline-none border border-primary px-4 py-2 text-primary capitalize"
            >
              edit
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-5 items-start self-center">
          <h1
            class="text-white text-left text-2xl leading-10 font-medium capitalize"
          >
            {{ singleHouse.houseType }}
          </h1>
        </div>
      </div>

      <div class="flex flex-col justify-between pt-20">
        <div class="flex flex-col items-center gap-3">
          <img
            class="w-8 self-center"
            src="@/assets/icon/calendar.svg"
            alt=""
          />
          <p class="text-xs text-left text-white">Due date</p>
          <p class="text-sm text-left text-white">59</p>
        </div>

        <div class="flex self-end gap-x-4 -mb-10 mt-5 justify-end">
          <TurfButton size="large" class="" color="primary"
            ><span class="text-xs capitalize"
              >Send a Notification
            </span></TurfButton
          >
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 mb-12 pr-44">
      <p class="invisible">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
        laboriosam maxime nulla aliquid veritatis eius animi, nemo officiis
        officia, harum voluptate dignissimos nisi nam laborum ea ad quod rem
        numquam.
      </p>
      <div
        class="col-span-1 mt-12 flex flex-col gap-9 justify-end text-left self-end"
      >
        <form class="w-full flex flex-col gap-6" action="">
          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Tenant Name </label>
            <TurfInput :value="singleHouse.username" class="text-white">{{
              singleHouse.username
            }}</TurfInput>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">House Address </label>
            <TurfInput :value="singleHouse.address" class="text-white">{{
              singleHouse.address
            }}</TurfInput>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Tenant Number </label>
            <TurfInput class="text-white"></TurfInput>
          </div>
        </form>

        <div class="flex flex-col gap-4 gap-2">
          <div class="flex justify-between w-full items-center">
            <label class="text-secondary text-xs" for=""
              >Payment History
            </label>
            <label class="text-secondary text-xs" for="">View </label>
          </div>
          <div
            class="w-full bg-inputcolor text-sm px-3 py-4 flex justify-between items-center"
          >
            <span>House Payment for March</span>
            <span class="text-success">2,000,000</span>
          </div>

          <div
            class="w-full bg-inputcolor text-sm px-3 py-4 flex justify-between items-center"
          >
            <span>House Payment for April</span>
            <span class="text-success">2,000,000</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import TurfButton from "@/components/ButtonNew.vue";
import TurfInput from "@/components/TextInput.vue";

import { useDataStore } from "@/stores/data.js";

import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";

const store = useDataStore();
const route = useRoute();

const { query } = store;
const singleHouse = computed(() =>
  store.getAgentHouses.find((h) => h._id === route.params.id)
);

async function queryHouses() {
  await query({
    endpoint: "FetchHouses",
    payload: {},
    service: "GENERAL",
    storeKey: "agentHouses",
  });
}

onMounted(async () => {
  await queryHouses();
});
</script>

<style></style>
