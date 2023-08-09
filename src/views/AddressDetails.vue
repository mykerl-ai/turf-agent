<template>
  <main class="w-full">
    <div class="flex justify-around w-full bg-secondary pb-10 text-xs">
      <div class="flex flex-col gap-2 items-start self-center mt-7 -ml-20">
        <label class="text-white text-lg font-medium" for="address"
          >Address</label
        >

        <div class="flex items-center gap-3">
          <input
            name="address"
            class="border-none bg-secondary focus:bg-secondary text-white focus:ring-0 focus:outline-none text-left text-2xl leading-10 font-medium capitalize"
            :value="houseUnits.address"
            :readonly="!edit.address ? true : false"
          />
          <img
            v-show="!edit.address"
            @click="edit.address = true"
            src="@/assets/icons/white-pen.svg"
            class="w-4 cursor-pointer"
            alt=""
          />
          <img
            v-show="edit.address"
            @click="edit.address = false"
            src="@/assets/icons/white-cancel.svg"
            class="border border-white w-4 h-4 rounded-full cursor-pointer"
            alt=""
          />
        </div>

        <div class="flex items-center my-8 gap-4">
          <select
            class="border-none bg-secondary focus:bg-secondary text-white focus:ring-0 focus:outline-none text-left text-sm w-auto font-medium capitalize"
            :value="houseUnits.houseType"
            name="address"
            id=""
            :disabled="!edit.type ? true : false"
          >
            <option
              v-for="opt in houseOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </option>
          </select>
          <!-- <h1
            class="text-white text-left text-sm leading-10 font-medium capitalize"
          >
            {{ houseUnits.houseType }}
          </h1> -->
          <img
            v-show="!edit.type"
            @click="edit.type = true"
            src="@/assets/icons/white-pen.svg"
            class="w-4 cursor-pointer"
            alt=""
          />
          <img
            v-show="edit.type"
            @click="edit.type = false"
            src="@/assets/icons/white-cancel.svg"
            class="border border-white w-4 h-4 rounded-full cursor-pointer"
            alt=""
          />
        </div>
        <button
          v-show="edit.address || edit.type"
          class="focus:outline-none rounded-lg border border-white text-xs px-2 py-2 text-white capitalize"
          style="z-index: 1"
        >
          Update
        </button>
      </div>

      <div class="flex gap-x-16">
        <div class="flex self-end gap-x-4 -mb-16 justify-end">
          <TurfButton size="large" class="" color="primary"
            ><span class="text-xs capitalize">view status</span></TurfButton
          >
        </div>
        <div class="flex gap-3 -mb-24 justify-end flex-col">
          <p class="text-white text-xs text-center">
            <span class="text-xl">{{
              (houseUnits && houseUnits.homeDetails.length) || 0
            }}</span>
            <br />
            Units under <br />
            with this address
          </p>

          <p class="invisible text-secondary text-xs text-center">
            <span class="text-xl">{{
              (houseUnits && houseUnits.homeDetails.length) || 0
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
          class="invisible -mb-32 bg-cover mt-12 w-52 h-72"
          :src="avatar"
          alt=""
        />

        <img
          v-else
          class="invisible -mb-32 bg-contain mt-12 w-52 h-72"
          :src="agentProfile.profileImage"
          alt=""
        />
      </div>
    </div>
    <div class="w-full px-8 my-8">
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

      <div class="mt-9 text-sm">
        <h3 class="text-secondary text-left mb-4">Houses under address</h3>
        <div class="flex flex-wrap gap-5">
          <div
            v-for="hd in houseUnits.homeDetails"
            :key="hd._id"
            @click="
              $router.push({ name: 'SingleProperty', params: { id: hd._id } })
            "
            class="flex flex-col gap-3"
          >
            <img
              v-if="hd.fileUrl.length"
              class="bg-contain h-64 w-60"
              :src="hd.fileUrl[0]"
              alt=""
            />
            <img
              v-else
              class="bg-contain h-64 w-60"
              src="@/assets/img/house-1.png"
              alt=""
            />

            <p
              style="color: #a1a1a1"
              class="text-lightText text-left text-xs leading-5"
            >
              {{ formatAmount(hd.price) }}
            </p>
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

import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";

const store = useDataStore();
const route = useRoute();
const { formatAmount } = helperFunctions;

const { query } = store;
const agentProfile = computed(() => store.getAgentData);
const listOfHouses = computed(() => store.getAgentHouses);
const houseUnits = computed(() =>
  listOfHouses.value.find((det) => det._id === route.params.id)
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
const edit = ref({ address: false, type: false });

const houseOptions = ref([
  { label: "Bungalows", value: "BUNGALOWS" },
  { label: "Duplex", value: "DUPLEX" },
  { label: "Terrace Duplex", value: "TERRACE_DUPLEX" },
  { label: "Semi-detached Duplex", value: "SEMI_DETACHED_DUPLEX" },
  { label: "Fully-detached Duplex", value: "FULLY_DETACHED_DUPLEX" },
  { label: "Mansion", value: "MANSION" },
  { label: "Apartment/Condos", value: "APARTMENT_CONDOS" },
  { label: "Maisonette", value: "MAISONETTE" },
  { label: "Pent-house", value: "PENT_HOUSE" },
]);

onMounted(async () => {
  await queryAgents();
  await queryHouses();
});
</script>

<style></style>
