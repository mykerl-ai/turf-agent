<template>
  <main class="w-full">
    <div class="flex justify-between w-full bg-secondary pl-10 text-xs">
      <div class="flex flex-col gap-5 items-start self-center">
        <h1
          class="text-white text-left text-2xl leading-10 font-medium capitalize"
        >
          monitor <br />
          your houses
        </h1>
        <TurfButton
          @click="$router.push({ name: 'ProfileView' })"
          size="small"
          color="primary"
          ><span class="text-xs capitalize"> view profile</span></TurfButton
        >
      </div>

      <img class="-mb-5 h-72" src="@/assets/img/agent-hero.png" alt="" />
    </div>
    <div class="flex flex-row-reverse -mt-7">
      <TurfButton
        @click="$router.push({ name: 'AddHouse' })"
        size="large"
        class="mr-32"
        color="primary"
        ><span class="text-xs capitalize">upload a house</span></TurfButton
      >
    </div>
    <div class="full mt-12 mb-5 px-8 flex items-center gap-8">
      <h3
        @click="toggle = !toggle"
        :class="
          toggle ? 'border-b-2 border-primary text-primary' : 'text-secondary'
        "
        class="text-sm cursor-pointer pb-2"
      >
        House Information
      </h3>
      <h3
        @click="toggle = !toggle"
        :class="
          !toggle ? 'border-b-2 border-primary text-primary' : 'text-secondary'
        "
        class="text-sm cursor-pointer pb-2"
      >
        Pending Appointments
      </h3>
    </div>
    <div class="w-full my-6 px-4">
      <div
        v-show="toggle"
        class="relative grid grid-cols-4 rounded-xl text-secondary w-full justify-between py-3 px-8"
      >
        <div
          class="grid grid-cols-4 col-span-4 mb-5 rounded-xl border border-greyBorder text-secondary w-full justify-between py-5 text-xs px-8"
        >
          <p class="w-full capitalize text-xs text-left">address</p>
          <p class="capitalize text-xs text-left justify-self-end">units</p>
          <p class="capitalize text-xs text-left justify-self-end">
            available units
          </p>
          <p class="capitalize text-xs text-left justify-self-end">options</p>
        </div>

        <div
          v-for="house in listOfHouses"
          :key="house._id"
          class="cursor-pointer relative bg-backgrd grid grid-cols-4 w-full rounded-xl my-2 col-span-4 py-2 px-4"
          @click="
            $router.push({ name: 'AddressDetails', params: { id: house._id } })
          "
        >
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 bg-secondary rounded-full"></div>
            <p class="text-xs text-secondary capitalize">
              {{ house.address }}
            </p>
          </div>
          <div class="flex justify-self-end text-xs items-center">
            <p class="capitalize text-xs font-bold text-left">
              {{ house.homeDetails.length }}
            </p>
          </div>

          <div class="flex justify-self-end text-xs items-center">
            <p
              class="capitalize -ml-24 text-xs text-success font-bold text-left"
            >
              {{
                house.homeDetails.filter((h) => h.statusType === "AVAILABLE")
                  .length
              }}
            </p>
          </div>

          <div class="flex justify-self-end mr-8 items-center">
            <p class="capitalize text-xs text-left">edit</p>
          </div>
          <div
            class="absolute right-0 top-0 h-full rounded-r-xl w-4 bg-error"
          ></div>
        </div>
      </div>

      <!-- Appointments -->
      <div
        v-show="!toggle"
        class="relative grid grid-cols-4 rounded-xl text-secondary w-full justify-between py-3 px-8"
      >
        <div
          class="grid grid-cols-5 col-span-5 mb-5 rounded-xl border border-greyBorder text-secondary w-full justify-between py-5 text-xs px-8"
        >
          <p class="w-full capitalize text-xs text-left">name</p>
          <p class="capitalize text-xs text-left justify-self-center">
            house address
          </p>
          <p class="capitalize text-xs text-left justify-self-center -mr-16">
            type
          </p>
          <p class="capitalize text-xs text-left justify-self-center -mr-24">
            price
          </p>
          <p class="capitalize text-xs text-left justify-self-end">Status</p>
        </div>

        <div
          v-for="app in listOfAppointments"
          :key="app._id"
          class="cursor-pointer relative bg-backgrd grid grid-cols-5 w-full rounded-xl my-2 col-span-5 py-2 px-4"
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
            class="flex justify-self-end text-xs items-center"
          >
            <p class="capitalize text-xs font-medium text-left">
              {{ app.address }}
            </p>
          </div>
          <div
            @click="
              $router.push({ name: 'ViewAppointment', params: { id: app._id } })
            "
            class="flex justify-self-end text-xs items-center"
          >
            <p class="capitalize text-xs font-medium text-left">
              {{ app.type }}
            </p>
          </div>

          <div
            @click="
              $router.push({ name: 'ViewAppointment', params: { id: app._id } })
            "
            class="flex justify-self-end text-xs items-center"
          >
            <p class="capitalize -ml-24 text-xs font-medium text-left">
              {{ formatAmount(app.price) }}
            </p>
          </div>

          <div class="flex relative gap-x-4 justify-self-end mr-8 items-center">
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
              class="w-52 absolute group-hover:text-primary flex right-10 flex-col bg-white rounded-2xl shadow-lg"
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

const listOfHouses = computed(() => store.getAgentHouses);
const listOfAppointments = computed(() => {
  const data = store.getAppointments.map((app) => {
    return {
      _id: app._id,
      name: app.client.username,
      image: app.client.profileImage || null,
      address: app.house.address,
      type: app.house.houseType,
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
