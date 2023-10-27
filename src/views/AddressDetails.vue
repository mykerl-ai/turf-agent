<template>
  <main class="w-full">
    <div
      class="flex md:flex-row flex-col md:justify-around w-full bg-secondary pb-5 md:pb-10 text-xs"
    >
      <div
        class="title-Font flex flex-col md:gap-2 ml-4 items-start md:self-center mt-7 md:-ml-40"
      >
        <label
          class="text-white md:text-lg font-bold md:mb-0 mb-4"
          for="address"
          >Address</label
        >

        <div class="flex items-center gap-3">
          <input
            name="address"
            class="border-none bg-secondary focus:bg-secondary text-white focus:ring-0 focus:outline-none text-left md:text-2xl md:leading-10 font-medium capitalize"
            v-model="args.address"
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
            class="border-none bg-secondary focus:bg-secondary text-white focus:ring-0 focus:outline-none text-left text-sm w-auto font-bold text-xs md:text-base capitalize"
            v-model="args.houseType"
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
          @click="updateHouse"
          class="focus:outline-none rounded-lg border border-white text-xs px-2 py-2 text-white capitalize"
          style="z-index: 1"
        >
          Update
        </button>
      </div>

      <div
        class="flex justify-between px-4 md:px-0 md:justify-start md:gap-x-16"
      >
        <div class="invisible flex self-end gap-x-4 md:-mb-16 md:justify-end">
          <TurfButton size="large" class="" color="primary"
            ><span class="text-xs capitalize">view status</span></TurfButton
          >
        </div>
        <div class="title-Font flex gap-3 md:-mb-24 justify-end md:flex-col">
          <p class="text-white text-xs md:text-center">
            <span class="md:text-xl text-lg">{{
              (houseUnits && houseUnits.homeDetails.length) || 0
            }}</span>
            <br />
            Units<br />
            with this address
          </p>

          <p class="hidden text-secondary text-xs md:text-center">
            <span class="md:text-xl">{{
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
          class="hidden -mb-32 bg-cover mt-12 w-52 h-72"
          :src="avatar"
          alt=""
        />

        <img
          v-else
          class="hidden -mb-32 bg-contain mt-12 w-52 h-72"
          :src="agentProfile.profileImage"
          alt=""
        />
      </div>
    </div>
    <div class="w-full px-4 md:px-8 my-8">
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
        <div class="flex items-center gap-4 mb-4">
          <h3 class="title-Font text-secondary text-left">
            Units under this address
          </h3>
          <h2
            @click="
              $router.push({
                name: 'AddHouse',
                params: { id: $route.params.id },
                query: { task: 'update-house' },
              })
            "
            class="cursor-pointer font-medium text-primary"
          >
            <span class="text-primary rounded-lg font-bold">+</span>
            Add units
          </h2>
        </div>
        <div class="flex flex-wrap gap-5">
          <div
            v-for="hd in houseUnits.homeDetails"
            :key="hd._id"
            @click="
              $router.push({ name: 'SingleProperty', params: { id: hd._id } })
            "
            class="flex flex-col gap-4"
          >
            <img
              v-if="hd.fileUrl.length"
              class="object-cover h-64 w-96 md:w-60"
              :src="
                hd.fileUrl[0].includes('https') ? hd.fileUrl[0] : hd.fileUrl[1]
              "
              alt=""
            />
            <img
              v-else
              class="object-cover h-64 w-96 md:w-60"
              src="@/assets/img/house-1.png"
              alt=""
            />
            <div class="flex flex-col gap-1">
              <span class="font-medium text-left text-sm">
                {{ formatAmount(hd.price) }}
              </span>

              <span
                style="color: #a1a1a1"
                class="font-medium capitalize text-left text-xs leading-5"
              >
                {{ hd.description }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TurfLoader v-if="loading" />
  </main>
</template>

<script setup>
import TurfButton from "@/components/ButtonNew.vue";
import { useDataStore } from "@/stores/data.js";
import avatar from "@/assets/img/avatar.png";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useToast } from "vue-toastification";

import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";

const store = useDataStore();
const toast = useToast();

const route = useRoute();
const { formatAmount } = helperFunctions;

const { query, mutate } = store;
const agentProfile = computed(() => store.getAgentData);
const listOfHouses = computed(() => store.getAgentHouses);
const houseUnits = computed(() =>
  listOfHouses.value.find((det) => det._id === route.params.id)
);
const args = ref({
  username: null,
  houseType: null,
  homeDetails: null,
  address: null,
});
async function queryHouses() {
  try {
    loading.value = true;
    await query({
      endpoint: "FetchHouses",
      payload: {},
      service: "GENERAL",
      storeKey: "agentHouses",
    });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
async function queryAgents() {
  try {
    await query({
      endpoint: "FetchAgent",
      payload: {},
      service: "GENERAL",
      storeKey: "agentData",
    });
  } catch (e) {
    console.log(e);
  }
}
const edit = ref({ address: false, type: false });
const loading = ref(false);

async function updateHouse() {
  loading.value = true;
  let payload = args.value;
  delete payload.homeDetails;
  try {
    let res = await mutate({
      endpoint: "UpdateHouse",
      data: {
        updateHouseId: route.params.id,
        input: payload,
      },
      service: "GENERAL",
    });
    if (res && res._id) {
      await queryHouses();
      toast.success("House updated");
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

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
  await queryHouses();
  await queryAgents();

  args.value.address = houseUnits.value?.address;
  args.value.username = houseUnits.value?.username;
  args.value.houseType = houseUnits.value?.houseType;
  args.value.homeDetails = houseUnits.value?.homeDetails.map((h) => {
    return {
      bathRoom: h.bathRoom,
      bedRoom: h.bedRoom,
      description: h.description,
      fileUrl: h.fileUrl,
      paymentType: h.paymentType,
      price: h.price,
      requirement: h.requirement,
      rules: h.rules,
      statusType: h.statusType,
      toilet: h.toilet,
    };
  });
});
</script>

<style></style>
