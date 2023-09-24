<template>
  <main class="w-full">
    <div
      class="flex md:flex-row flex-col gap-y-5 md:gap-y-0 items-center justify-around w-full bg-secondary pb-10 text-xs"
    >
      <div
        class="flex flex-col md:-ml-32 gap-5 mt-4 md:mt-0 items-start md:self-center"
      >
        <h1
          class="hidden md:block title-Font text-white text-left text-lg md:text-2xl md:leading-10 font-medium capitalize"
        >
          Agent <br />
          {{ agentProfile.username }}
        </h1>
        <h1
          class="md:hidden title-Font text-white text-left text-lg md:text-2xl md:leading-10 font-medium capitalize"
        >
          Agent {{ agentProfile.username }}
        </h1>
      </div>

      <div class="flex md:flex-row flex-col md:gap-x-16">
        <div
          class="hidden md:flex md:self-end gap-x-4 md:-mb-16 md:justify-end"
        >
          <TurfButton size="large" class="invisible" color="primary"
            ><span class="text-xs capitalize">view status</span></TurfButton
          >
        </div>
        <div
          class="title-Font flex gap-3 md:-mb-24 md:justify-end flex-row md:flex-col"
        >
          <p class="text-white text-xs md:text-center">
            <span class="text-xl">{{
              (listOfHouses && listOfHouses.length) || 0
            }}</span>
            <br />
            Houses under <br />
            your watch
          </p>

          <p class="text-white md:text-secondary text-xs md:text-center">
            <span class="text-xl">{{
              (listOfHouses && listOfHouses.length) || 0
            }}</span
            ><br />
            Houses under <br />
            your watch
          </p>
        </div>

        <img
          v-if="
            !agentProfile ||
            !agentProfile.profileImage ||
            !agentProfile.profileImage.length
          "
          class="-mb-32 object-contain md:mt-12 w-52 h-52 md:h-72"
          :src="avatar"
          alt=""
        />

        <img
          v-else
          class="-mb-32 object-contain rounded-3xl mt-12 w-52 h-52 md:h-72"
          :src="agentProfile.profileImage"
          alt=""
        />
      </div>
    </div>
    <div class="w-full px-4 mt-32 md:px-8 md:my-8">
      <!-- <div
        @click="$router.push({ name: 'WalletPage' })"
        class="cursor-pointer w-80 p-4 bg-backgrd rounded-2xl"
      >
        <h1 class="text-secondary font-medium text-sm text-left mb-3">
          Create a wallet
        </h1>
        <p
          style="color: #a1a1a1"
          class="text-lightText text-left text-xs leading-5"
        >
          You need to create a wallet to subscribe and also get payment from
          teenants
        </p>
      </div> -->

      <div
        @click="$router.push({ name: 'WalletPage' })"
        class="bg-primary rounded-xl p-6 cursor-pointer flex flex-col shadow-2xl justify-between w-80 h-44"
      >
        <div class="flex justify-between">
          <img class="w-20" src="@/assets/icon/turf-logo.svg" alt="" />
          <span class="self-start font-medium text-white">{{
            formatAmount(agentProfile.walletBalance)
          }}</span>
        </div>
        <span
          class="bg-secondary p-4 rounded-full text-white text-xs font-medium self-end justify-self-end"
          >View Wallet</span
        >
      </div>

      <div class="mt-9 text-sm">
        <h3 class="text-secondary text-left mb-4">Houses under you</h3>
        <div class="flex flex-wrap gap-5">
          <div
            v-for="hd in houseUnits"
            :key="hd._id"
            @click="
              $router.push({ name: 'SingleProperty', params: { id: hd._id } })
            "
            class="flex flex-col md:gap-2"
          >
            <img
              v-if="hd.fileUrl.length"
              class="object-contain md:h-64 w-80 md:w-auto"
              :src="
                hd.fileUrl[0].includes('https') ? hd.fileUrl[0] : hd.fileUrl[1]
              "
              alt=""
            />
            <img
              v-else
              class="object-contain md:h-64 w-80 md:w-auto"
              src="@/assets/img/house-1.png"
              alt=""
            />

            <span
              style="color: #a1a1a1"
              class="text-lightText font-bold mt-2 text-left text-xs leading-5"
            >
              {{ formatAmount(hd.price) }}
            </span>

            <span
              style="color: #a1a1a1"
              class="text-lightText font-bold mt-2 text-left text-xs leading-5"
            >
              {{ hd.description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import TurfButton from "@/components/ButtonNew.vue";
import { useDataStore } from "@/stores/data.js";
import avatar from "@/assets/img/avatar.png";
import { helperFunctions } from "@/composable/HelperFunctions";

// import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";

const store = useDataStore();
// const router = useRouter();
const { formatAmount } = helperFunctions;

const { query } = store;
const agentProfile = computed(() => store.getAgentData);
const listOfHouses = computed(() => store.getAgentHouses);
const houseUnits = computed(() =>
  listOfHouses.value.map((det) => det.homeDetails).flat()
);

async function queryHouses() {
  await query({
    endpoint: "FetchHouses",
    payload: {},
    service: "GENERAL",
    storeKey: "agentHouses",
  });
}
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
  await queryHouses();
});
</script>

<style></style>
