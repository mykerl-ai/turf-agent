<template>
  <main v-if="homeWithDetails && homeWithDetails.fileUrl" class="w-full">
    <div
      class="flex flex-col md:flex-row md:justify-between w-full bg-secondary md:px-16 pb-5 md:pb-20 text-xs"
    >
      <div class="flex ml-4 md:ml-0 flex-col md:flex-row gap-5 md:gap-8">
        <div class="md:-mb-96 mt-5 md:mt-12">
          <!-- <img
            v-if="!homeWithDetails.fileUrl.length"
            class="h-6/12 w-60 bg-contain"
            src="@/assets/img/house-3.png"
            alt=""
          />
          <img
            v-else
            class="h-6/12 w-60"
            style="object-fit: contain"
            :src="
              homeWithDetails.fileUrl[0].includes('https')
                ? homeWithDetails.fileUrl[0]
                : homeWithDetails.fileUrl[1]
            "
            alt=""
          /> -->
          <div
            v-if="homeWithDetails.fileUrl.length"
            class="relative h-72 w-72 flex flex-col md:flex-row md:items-center md:justify-center text-left bg-cover cursor-pointer bg-center"
            @click="onPreview(img)"
            :style="
              homeWithDetails.fileUrl[0].includes('https')
                ? {
                    backgroundImage: ' url(' + homeWithDetails.fileUrl[0] + ')',
                  }
                : {
                    backgroundImage: ' url(' + homeWithDetails.fileUrl[1] + ')',
                  }
            "
          ></div>
          <div
            v-else
            class="relative h-72 w-72 flex items-center justify-center text-left bg-cover cursor-pointer bg-center"
            @click="onPreview(img)"
            style="background-image: url('@/assets/img/house-3.png')"
          ></div>
        </div>

        <div class="title-Font flex flex-col gap-5 items-start md:self-center">
          <div class="flex items-center gap-5">
            <h1
              class="text-white text-left text-sm md:text-2xl md:leading-10 font-medium capitalize"
            >
              {{ propertyTypes[houseDetails.houseType] }}
            </h1>
            <div
              @click="
                $router.push({
                  name: 'AddHouse',
                  params: { id: $route.params.id },
                })
              "
              class="cursor-pointer"
            >
              <img
                src="@/assets/icons/white-pen.svg"
                class="w-4 cursor-pointer"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-5 md:mt-0 flex flex-col justify-between ml-4 md:ml-0 md:pt-20"
      >
        <div class="title-Font flex md:flex-col flex-row items-center gap-3">
          <img
            class="md:w-8 w-6 md:self-center"
            src="@/assets/icon/calendar.svg"
            alt=""
          />
          <p class="text-xs text-left text-white">Due date</p>
          <p class="text-sm text-left text-white">59</p>
        </div>

        <div class="flex md:self-end gap-x-0 md:-mb-10 mt-5 md:justify-end">
          <TurfButton size="large" class="hidden md:block" color="primary"
            ><span class="text-xs capitalize"
              >Send a Notification
            </span></TurfButton
          >

          <TurfButton size="small " class="md:hidden" color="primary"
            ><span class="text-xs capitalize"
              >Send a Notification
            </span></TurfButton
          >
        </div>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 justify-around mt-2 md:mt-16 mb-12 px-4 md:px-20"
    >
      <div class="col-span-1 flex flex-col gap-2">
        <p class="text-secondary text-sm text-left my-4">Current Status</p>

        <div
          class="relative flex justify-between md:justify-start md:gap-x-32 items-center"
        >
          <p
            :class="
              homeWithDetails.statusType === 'AVAILABLE'
                ? 'text-success'
                : 'text-error'
            "
            class="capitalize text-xs font-bold text-left"
          >
            {{ homeWithDetails.statusType }}
          </p>

          <button
            @click="showStatus = !showStatus"
            class="focus:outline-none border border-primary px-4 py-2 text-xs text-primary capitalize"
          >
            edit
          </button>

          <div
            v-show="showStatus"
            class="w-52 absolute group-hover:text-primary flex -ml-4 left-80 flex-col bg-white rounded-2xl shadow-lg"
            style="z-index: 1"
          >
            <div
              class="flex flex-col z-50 text-left items-start text-dark-800 text-sm cursor-pointer pt-2"
            >
              <span
                v-show="homeWithDetails.statusType !== 'AVAILABLE'"
                @click="updateStatus('AVAILABLE')"
                class="hover:bg-secondary hover:text-white text-xs py-2 px-4 w-full"
                >Available</span
              >
              <span
                v-show="homeWithDetails.statusType !== 'TAKEN'"
                @click="updateStatus('TAKEN')"
                class="hover:bg-secondary hover:text-white text-xs py-2 px-4 w-full"
                >Taken</span
              >
              <span
                v-show="homeWithDetails.statusType !== 'REVIEW'"
                @click="updateStatus('REVIEW')"
                class="hover:bg-secondary hover:text-white text-xs py-2 px-4 w-full"
                >In review</span
              >
            </div>
          </div>
        </div>

        <div
          class="mt-5 flex gap-x-32 justify-between md:justify-start items-center"
        >
          <p class="text-secondary capitalize text-xs font-medium text-left">
            Price
          </p>

          <p
            class="capitalize text-xs text-secondary self-end justify-end text-right font-bold text-left"
          >
            {{ formatAmount(homeWithDetails.price) }}
          </p>
        </div>

        <div class="mt-6 flex items-center gap-3 flex-wrap">
          <div
            v-for="img in homeWithDetails.fileUrl"
            :key="img"
            class="relative h-40 w-40 flex items-center text-left bg-cover cursor-pointer bg-center"
            :style="{
              backgroundImage: ' url(' + img + ')',
            }"
            @mouseenter="setHoveredImg(img)"
            @mouseleave="clearHoveredImg"
          >
            <div
              class="absolute backdrop-brightness-50 top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"
            ></div>

            <main
              class="flex items-center justify-center mx-auto gap-4 p-5 z-10"
              v-if="isHovered(img)"
            >
              <img
                @click="openModal(img)"
                src="@/assets/icons/white-delete.svg"
                class="w-3 cursor-pointer"
                alt=""
              />
              <img
                @click="onPreview(img)"
                src="@/assets/icons/white-eye.svg"
                class="w-4 cursor-pointer"
                alt=""
              />
            </main>
          </div>
        </div>
      </div>
      <div
        class="col-span-1 md:mt-2 mt-5 flex flex-col gap-9 justify-end text-left self-end"
      >
        <form class="w-full flex flex-col gap-6" action="">
          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Tenant Name </label>
            <TurfInput :value="houseDetails.username" class="text-white">{{
              houseDetails.username
            }}</TurfInput>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">House Address </label>
            <TurfInput :value="houseDetails.address" class="text-white">{{
              houseDetails.address
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

    <TurfModal
      :lite="true"
      :isBorder="false"
      :compliance="true"
      v-if="previewModal"
      @close="previewModal = false"
    >
      <div
        style="height: calc(100vh - 250px)"
        class="w-full flex flex-col items-center h-auto overflow-y-scoll"
      >
        <iframe
          ref="pdfPreview"
          :src="imgsRef"
          style="
            width: 98%;
            height: 100%;
            background-position: center;
            background-size: contain;
            object-fit: contain;
          "
          allowfullscreen
        ></iframe>
      </div>
    </TurfModal>
    <TurfLoader v-if="loading" />
    <DeleteModal
      @close="openDelete = false"
      @delete="updateStatus(null, toBeDeleted)"
      v-if="openDelete"
    />
  </main>
</template>

<script setup>
import TurfButton from "@/components/ButtonNew.vue";
import TurfInput from "@/components/TextInput.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useToast } from "vue-toastification";

import { useDataStore } from "@/stores/data.js";

import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";

const store = useDataStore();
const route = useRoute();
const toast = useToast();

const { formatAmount } = helperFunctions;

const { query, mutate } = store;
const listOfHouses = computed(() => store.getAgentHouses);

const loading = ref(false);
function fetchHomeDetails(targetHomeDetailId) {
  const filteredData = listOfHouses.value
    .map((item) => {
      const filteredHomeDetails = item.homeDetails.filter(
        (homeDetail) => homeDetail._id === targetHomeDetailId
      );

      if (filteredHomeDetails.length > 0) {
        return {
          ...item,
          // homeDetails: filteredHomeDetails,
        };
      }

      return null;
    })
    .filter(Boolean);
  return filteredData[0];
}
const houseDetails = computed(() => fetchHomeDetails(route.params.id));
const homeWithDetails = computed(() => store.getSingleHomeDetail);
const hoveredImg = ref("");
const showStatus = ref(false);
const openDelete = ref(false);
const toBeDeleted = ref("");

function openModal(img) {
  toBeDeleted.value = img;
  openDelete.value = true;
}

const propertyTypes = ref({
  BUNGALOWS: "Bungalows",
  DUPLEX: "Duplex",
  TERRACE_DUPLEX: "Terrace Duplex",
  SEMI_DETACHED_DUPLEX: "Semi-detached Duplex",
  FULLY_DETACHED_DUPLEX: "Fully-detached Duplex",
  MANSION: "Mansion",
  APARTMENT_CONDOS: "Apartment/Condos",
  MAISONETTE: "Maisonette",
  PENT_HOUSE: "Pent-house",
});

function setHoveredImg(img) {
  hoveredImg.value = img;
}
function clearHoveredImg() {
  hoveredImg.value = null;
}
function isHovered(img) {
  return hoveredImg.value === img;
}
async function queryHouses() {
  await query({
    endpoint: "FetchHouses",
    payload: {},
    service: "GENERAL",
    storeKey: "agentHouses",
  });
}
const previewModal = ref(false);
const imgsRef = ref("");
const onPreview = (img) => {
  imgsRef.value = img;
  previewModal.value = true;
};

async function queryHomeDetails() {
  try {
    loading.value = true;
    await query({
      endpoint: "FetchHomeDetailsById",
      payload: { fetchHomeDetailsByIdId: route.params.id },
      service: "GENERAL",
      storeKey: "singleHomeDetail",
    });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
const args = ref({
  bathRoom: "",
  bedRoom: "",
  description: "",
  requirement: "",
  rules: "",
  toilet: "",
  paymentType: "YEARLY",
  price: "",
  statusType: "AVAILABLE",
  fileUrl: [],
});
async function updateStatus(status, image) {
  if (status) {
    args.value.statusType = status;
  } else if (image) {
    args.value.fileUrl = args.value.fileUrl.filter((img) => img !== image);
  }
  try {
    loading.value = true;

    let res = await mutate({
      endpoint: "UpdateAgentUploadHouse",
      data: { updateAgentUploadHouseId: route.params.id, input: args.value },
      // service: "EMP",
    });
    if (res._id) {
      showStatus.value = false;
      await queryHomeDetails();
      toast.success("Updated successfully");
    }
  } catch (e) {
    console.log(e);
    toast.error(e.message);
  } finally {
    loading.value = false;
    openDelete.value = false;
  }
}
onMounted(async () => {
  await queryHomeDetails();
  await queryHouses();

  args.value.bedRoom = homeWithDetails.value.bedRoom;
  args.value.bathRoom = homeWithDetails.value.bathRoom;
  args.value.toilet = homeWithDetails.value.toilet;
  args.value.price = homeWithDetails.value.price;
  args.value.description = homeWithDetails.value.description;
  args.value.paymentType = homeWithDetails.value.paymentType;
  args.value.statusType = homeWithDetails.value.statusType;
  args.value.requirement = homeWithDetails.value.requirement;
  args.value.rules = homeWithDetails.value.rules;
  args.value.fileUrl = homeWithDetails.value.fileUrl;
});
</script>

<style>
iframe img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>
