<template>
  <main class="w-full">
    <div class="flex justify-between w-full bg-secondary px-16 pb-20 text-xs">
      <div class="flex gap-8">
        <div class="flex flex-col gap-5 items-start self-center">
          <h1
            class="title-Font text-white text-left text-2xl leading-10 font-medium capitalize"
          >
            Your HomeTurf

            <br />
            Wallet
          </h1>
          <div class="flex self-start gap-x-4 -mb-44 mt-5 justify-start">
            <TurfButton size="large" class="" color="primary"
              ><span class="text-xs capitalize"
                >Request Payment Slip
              </span></TurfButton
            >
          </div>
        </div>
      </div>

      <div class="mt-24">
        <div
          class="bg-primary rounded-xl p-6 flex flex-col justify-between w-80 h-44 -mb-32"
        >
          <div class="flex justify-between">
            <img class="w-20" src="@/assets/icon/turf-logo.svg" alt="" />
            <span class="self-start font-medium text-base text-white">{{
              formatAmount(agentProfile.walletBalance)
            }}</span>
          </div>
          <span
            class="text-white tracking-widest font-medium self-end justify-self-end"
            >{{ agentProfile.paymentDetails.accountName }}</span
          >
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 mb-12 pl-12">
      <div
        class="col-span-1 mt-24 flex flex-col gap-9 justify-end text-left self-end"
      >
        <form class="w-full flex flex-col gap-6" action="">
          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Account Number </label>
            <TurfInput
              :value="agentProfile.paymentDetails.accountNumber"
              :readonly="true"
              class="text-white"
            ></TurfInput>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Account Name </label>
            <TurfInput
              :readonly="true"
              :value="agentProfile.paymentDetails.accountName"
              class="text-white"
            ></TurfInput>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Bank Name </label>
            <TurfInput
              :readonly="true"
              :value="agentProfile.paymentDetails.bankName"
              class="text-white"
            ></TurfInput>
          </div>
        </form>
      </div>

      <p class="invisible">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
        laboriosam maxime nulla aliquid veritatis eius animi, nemo officiis
        officia, harum voluptate dignissimos nisi nam laborum ea ad quod rem
        numquam.
      </p>
    </div>
  </main>
</template>

<script setup>
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/HelperFunctions";

import TurfButton from "@/components/ButtonNew.vue";
import TurfInput from "@/components/TextInput.vue";

import { computed, onMounted } from "vue";

const { formatAmount } = helperFunctions;

const store = useDataStore();

const { query } = store;
const agentProfile = computed(() => store.getAgentData);

async function queryAgents() {
  await query({
    endpoint: "FetchAgent",
    payload: {},
    service: "GENERAL",
    storeKey: "agentData",
  });
}

onMounted(async () => {
  await queryAgents();
});
</script>

<style></style>
