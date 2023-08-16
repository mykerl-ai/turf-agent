<template>
  <main v-if="appointment && appointment.client" class="w-full">
    <div
      class="flex flex-col md:flex-row justify-between w-full bg-secondary md:px-16 md:pb-4 pb-8 text-xs"
    >
      <div class="flex flex-col md:flex-row gap-8 md:gap-8">
        <div class="md:-mb-44 -mb-52 mt-5 md:mt-12">
          <img
            v-if="!appointment.client.profileImage.length"
            class="md:h-7/12 md:w-72 w-40 bg-contain"
            src="@/assets/img/house-3.png"
            alt=""
          />
          <img
            v-else
            class="md:h-7/12 md:w-72 w-40 bg-contain"
            :src="appointment.client.profileImage"
            alt=""
          />

          <p class="ml-4 md:ml-0 text-secondary text-left my-4">
            Current Status
          </p>

          <div
            class="flex justify-between md:w-auto w-9/12 ml-4 md:ml-0 items-center"
          >
            <p
              :class="`text-${status[appointment.status]}`"
              class="capitalize text-xs font-bold text-left"
            >
              {{ appointment.status }}
            </p>

            <!-- <button
              @click="showOptions = !showOptions"
              class="focus:outline-none border border-primary px-4 py-2 text-primary capitalize"
            >
              edit
            </button> -->

            <button
              class="focus:outline-none border border-primary px-4 py-2 text-primary capitalize"
              style="z-index: 1"
            >
              <div
                class="flex flex-col z-50 text-left items-start text-primary text-sm cursor-pointer"
              >
                <span
                  v-if="appointment.status === 'APPROVED'"
                  @click="updateStatus('REJECTED')"
                  class="text-xs"
                  >Reject</span
                >
                <span
                  v-if="
                    appointment.status === 'PENDING' ||
                    appointment.status === 'REJECTED'
                  "
                  @click="updateStatus('APPROVED')"
                  class="text-xs"
                  >{{ "Approve" }}</span
                >
              </div>
            </button>
          </div>

          <div
            class="mt-5 flex justify-between md:w-auto w-9/12 ml-4 md:ml-0 items-center"
          >
            <p class="text-secondary capitalize text-xs font-medium text-left">
              Price
            </p>

            <p class="capitalize text-xs text-secondary font-bold text-left">
              {{ formatAmount(appointment.house.homeDetails[0].price) }}
            </p>
          </div>
        </div>

        <div class="title-Font flex flex-col gap-5 items-start self-center">
          <h1
            class="text-white text-left ml-20 md:ml-0 md:text-2xl md:leading-10 font-medium capitalize"
          >
            {{ propertyTypes[appointment.house.houseType] }}
          </h1>
        </div>
      </div>

      <!-- <div class="flex flex-col justify-between pt-20">
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
      </div> -->
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 mb-12 md:pr-44">
      <p class="invisible">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
        laboriosam maxime nulla aliquid veritatis eius animi, nemo officiis
        officia, harum voluptate dignissimos nisi nam laborum ea ad quod rem
        numquam.
      </p>
      <div
        class="col-span-1 mt-12 flex flex-col gap-9 justify-end text-left self-end"
      >
        <form
          class="md:w-full w-10/12 ml-1 md:ml-0 flex flex-col gap-4 md:gap-6"
          action=""
        >
          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Client Name </label>
            <TurfInput
              :value="appointment.client.username"
              class="text-white"
              >{{ appointment.client.username }}</TurfInput
            >
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">House Address </label>
            <TurfInput :value="appointment.client.address" class="text-white">{{
              appointment.client.address
            }}</TurfInput>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-secondary text-xs" for="">Age</label>
            <TurfInput
              :value="calculateAge(appointment.client.dob)"
              class="text-white"
            ></TurfInput>
          </div>
        </form>

        <!-- <div class="flex flex-col gap-4 gap-2">
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
        </div> -->
      </div>
    </div>
    <TurfLoader v-if="loading" />
  </main>
</template>

<script setup>
// import TurfButton from "@/components/ButtonNew.vue";
import TurfInput from "@/components/TextInput.vue";
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

const appointment = computed(() => store.getSingleAppointment);
const loading = ref(false);
const status = ref({
  PENDING: "primary",
  APPROVED: "success",
  REJECTED: "error",
});
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
async function queryAppointment() {
  await query({
    endpoint: "FetchAppointmentById",
    payload: { fetchAppointmentByIdId: route.params.id },
    service: "GENERAL",
    storeKey: "singleAppointment",
  });
}
async function updateStatus(status) {
  try {
    loading.value = true;

    let res = await mutate({
      endpoint: "CreateReviewAppointmentRequest",
      data: {
        input: { status, bookAppointmentId: route.params.id },
      },
      service: "GENERAL",
    });
    if (res && res._id) {
      await queryAppointment();
      toast.success("Status updated");
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const currentDate = new Date();

  let yearsDiff = currentDate.getFullYear() - dobDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - dobDate.getMonth();

  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && currentDate.getDate() < dobDate.getDate())
  ) {
    yearsDiff--; // Adjust age if birthday hasn't occurred yet this year
  }

  return yearsDiff;
}
onMounted(async () => {
  await queryAppointment();
});
</script>

<style></style>
