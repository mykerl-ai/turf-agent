<template>
  <main class="w-full">
    <div class="flex justify-between w-full bg-secondary pl-5 md:pl-10 text-xs">
      <div class="flex flex-col gap-5 items-start self-center">
        <h1
          class="title-Font text-white text-left text-lg md:text-3xl md:leading-10 font-medium capitalize"
        >
          monitor <br />
          your houses
        </h1>
        <TurfButton
          @click="$router.push({ name: 'ProfileView' })"
          size="small"
          color="primary"
          ><span class="md:text-sm text-xs capitalize">
            view profile</span
          ></TurfButton
        >
      </div>

      <img
        class="-mb-5 md:-mr-0 -mr-44 md:h-72"
        src="@/assets/img/agent-hero.png"
        alt=""
      />
    </div>
    <div class="flex flex-row-reverse -mt-7">
      <TurfButton
        @click="$router.push({ name: 'AddHouse', params: { id: 'new' } })"
        size="large"
        class="md:mr-32"
        color="primary"
        ><span class="text-xs capitalize">upload a house</span></TurfButton
      >
    </div>
    <div
      class="w-full mt-12 mb-5 px-2 md:px-12 flex md:justify-start justify-center items-center gap-8"
    >
      <h3
        @click="toggle = !toggle"
        :class="
          toggle
            ? 'border-b-2 border-primary text-primary font-medium'
            : 'text-lightText font-light'
        "
        class="md:text-sm text-xs cursor-pointer pb-2"
      >
        House Information
      </h3>
      <h3
        @click="toggle = !toggle"
        :class="
          !toggle
            ? 'border-b-2 border-primary text-primary font-medium'
            : 'text-lightText font-light'
        "
        class="md:text-sm text-xs cursor-pointer pb-2"
      >
        Pending Appointments
      </h3>
    </div>
    <div class="w-full md:my-6 px-2 md:px-4">
      <div
        v-show="toggle"
        class="relative grid grid-cols-4 rounded-xl text-secondary w-full justify-between md:py-3 pr-6 pl-2 md:px-8"
      >
        <div
          class="md:grid hidden grid-cols-4 col-span-4 mb-5 rounded-xl border border-greyBorder text-secondary w-full justify-between py-5 text-xs md:px-8 shadow-md"
        >
          <p class="w-full capitalize text-sm font-medium text-left">address</p>
          <p class="capitalize text-sm font-medium text-left justify-self-end">
            units
          </p>
          <p class="capitalize text-sm font-medium text-left justify-self-end">
            available units
          </p>
          <p class="capitalize text-sm font-medium text-left justify-self-end">
            options
          </p>
        </div>

        <div
          v-for="house in listOfHouses"
          :key="house._id"
          class="cursor-pointer relative bg-backgrd grid grid-cols-4 w-full rounded-xl my-3 col-span-4 py-2 px-4 shadow-lg"
          @click="
            $router.push({ name: 'AddressDetails', params: { id: house._id } })
          "
        >
          <div class="flex col-span-2 md:col-span-1 items-center gap-3 w-full">
            <div
              class="w-10 h-10 hidden md:block bg-secondary rounded-full"
            ></div>
            <p class="leading-6 text-xs text-secondary capitalize text-left">
              {{ house.address }}
            </p>
          </div>
          <div class="hidden md:flex justify-self-end text-xs items-center">
            <p class="capitalize text-xs font-bold text-left">
              {{ house.homeDetails.length }}
            </p>
          </div>

          <div class="hidden md:flex justify-self-end text-xs items-center">
            <p
              class="capitalize -ml-24 text-xs text-success font-bold text-left"
            >
              {{
                house.homeDetails.filter((h) => h.statusType === "AVAILABLE")
                  .length
              }}
            </p>
          </div>

          <div
            class="col-span-2 md:col-span-1 flex justify-self-end mr-8 items-center"
          >
            <p class="uppercase font-bold text-xs text-left">edit</p>
          </div>
          <div
            class="absolute right-0 top-0 h-full rounded-r-xl w-4 bg-error"
          ></div>
        </div>
      </div>

      <!-- Appointments -->
      <div
        v-show="!toggle"
        class="relative grid grid-cols-4 rounded-xl text-secondary w-full justify-between md:py-3 pr-6 pl-2 md:px-8"
      >
        <div
          class="hidden md:grid grid-cols-5 col-span-5 mb-5 rounded-xl border border-greyBorder text-secondary w-full justify-between py-5 text-xs px-8 shadow-md"
        >
          <p class="w-full capitalize text-sm font-medium text-left">name</p>
          <p
            class="capitalize text-sm font-medium text-left justify-self-center"
          >
            house address
          </p>
          <p
            class="capitalize text-sm font-medium text-left justify-self-center -mr-16"
          >
            type
          </p>
          <p
            class="capitalize text-sm font-medium text-left justify-self-center -mr-24"
          >
            price
          </p>
          <p class="capitalize text-sm font-medium text-left justify-self-end">
            Status
          </p>
        </div>

        <div
          v-for="app in listOfAppointments"
          :key="app._id"
          class="cursor-pointer relative bg-backgrd grid grid-cols-2 md:grid-cols-5 w-full rounded-xl my-3 col-span-5 py-2 md:px-4 px-2 shadow-lg"
        >
          <div
            @click="
              $router.push({ name: 'ViewAppointment', params: { id: app._id } })
            "
            class="flex items-center gap-3 w-full"
          >
            <div
              v-if="app.image && app.image.length"
              :style="{
                backgroundImage: ' url(' + app.image + ')',
              }"
              class="w-10 bg-contain h-10 bg-secondary rounded-full"
              style="background-repeat: no-repeat; background-position: center"
            ></div>
            <div v-else class="w-10 h-10 bg-secondary rounded-full"></div>
            <p class="text-xs text-secondary capitalize">
              {{ app.name }}
            </p>
          </div>
          <div
            @click="
              $router.push({ name: 'ViewAppointment', params: { id: app._id } })
            "
            class="flex justify-self-end text-xs items-end md:items-center"
          >
            <p
              class="md:leading-6 capitalize text-xs font-medium text-right md:text-left"
            >
              {{ app.address }}
            </p>
          </div>
          <div
            @click="
              $router.push({ name: 'ViewAppointment', params: { id: app._id } })
            "
            class="hidden md:flex justify-self-end text-xs items-center"
          >
            <p class="capitalize text-xs font-medium text-left">
              {{ app.type }}
            </p>
          </div>

          <div
            @click="
              $router.push({ name: 'ViewAppointment', params: { id: app._id } })
            "
            class="hidden md:flex justify-self-end text-xs items-center"
          >
            <p class="capitalize -ml-24 text-xs font-medium text-left">
              {{ formatAmount(app.price) }}
            </p>
          </div>

          <div
            class="md:col-span-1 col-span-3 flex relative gap-x-4 justify-self-end mt-6 mb-1 md:mb-0 md:mt-0 mr-5 md:mr-8 items-center"
          >
            <p
              :class="`text-${status[app.status]}`"
              class="capitalize font-bold text-xs text-left"
            >
              {{ app.status }}
            </p>
            <div
              @click="showOptions = app._id"
              class="absolute cursor-pointer -right-8 z-20 w-4"
            >
              <img src="@/assets/icons/more-icon.svg" alt="" />
            </div>
            <div
              v-show="showOptions === app._id"
              class="md:w-52 absolute group-hover:text-primary flex md:right-10 flex-col bg-white rounded-2xl shadow-lg"
              style="z-index: 1"
            >
              <div
                class="flex flex-col z-50 text-left items-start text-dark-800 text-sm cursor-pointer pt-2"
              >
                <span
                  class="hover:bg-secondary hover:text-white text-xs py-2 px-4 w-full"
                  @click="
                    $router.push({ name: 'ViewAppointment', params: app._id })
                  "
                >
                  View
                </span>

                <span
                  v-if="app.status === 'APPROVED'"
                  @click="updateStatus(app._id, 'REJECTED')"
                  class="hover:bg-secondary hover:text-white text-xs py-2 px-4 w-full"
                  >Reject</span
                >
                <span
                  v-if="app.status === 'PENDING' || app.status === 'REJECTED'"
                  @click="updateStatus(app._id, 'APPROVED')"
                  class="hover:bg-secondary hover:text-white text-xs py-2 px-4 w-full"
                  >{{ "Approve" }}</span
                >
              </div>
            </div>
          </div>
          <div
            :class="`bg-${status[app.status]}`"
            class="z-50 absolute right-0 top-0 h-full rounded-r-xl w-4"
          ></div>
        </div>
      </div>
      <!-- Appointments -->
    </div>
    <div
      @click="showOptions = ''"
      :class="!showOptions.length ? 'pointer-events-none' : ''"
      class="bg-transparent fixed inset-0"
    ></div>
    <TurfLoader v-if="loading" />
  </main>
</template>

<script setup>
import { useDataStore } from "@/stores/data.js";
// import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useToast } from "vue-toastification";

import TurfButton from "@/components/ButtonNew.vue";
const toast = useToast();

const store = useDataStore();
const { formatAmount } = helperFunctions;

// const router = useRouter();

const { query, mutate } = store;
const loading = ref(false);

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

const listOfHouses = computed(() => store.getAgentHouses);
const listOfAppointments = computed(() => {
  const data = store.getAppointments.map((app) => {
    return {
      _id: app._id,
      name: app.client.username,
      image: app.client.profileImage || null,
      address: app.house.address,
      type: propertyTypes.value[app.house.houseType],
      price: app.house.homeDetails[0].price,
      status: app.status,
    };
  });
  return data;
});
const toggle = ref(true);
const showOptions = ref("");
const status = ref({
  PENDING: "primary",
  APPROVED: "success",
  REJECTED: "error",
});
async function queryHouses() {
  try {
    await query({
      endpoint: "FetchHouses",
      payload: {},
      service: "GENERAL",
      storeKey: "agentHouses",
    });
  } catch (e) {
    console.log(e);
  }
}

async function queryAppointments() {
  try {
    await query({
      endpoint: "FetchAppointments",
      payload: {},
      service: "GENERAL",
      storeKey: "appointments",
    });
  } catch (e) {
    console.log(e);
  }
}

async function updateStatus(bookAppointmentId, status) {
  try {
    loading.value = true;

    let res = await mutate({
      endpoint: "CreateReviewAppointmentRequest",
      data: {
        input: { status, bookAppointmentId },
      },
      service: "GENERAL",
    });
    if (res && res._id) {
      await queryAppointments();
      toast.success("Status updated");
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await queryHouses();
  await queryAppointments();
});
</script>

<style></style>
