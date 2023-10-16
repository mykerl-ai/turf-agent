<template>
  <main class="w-full">
    <div
      class="flex flex-col md:flex-row justify-between w-full bg-secondary px-2 md:px-16 pb-16 md:pb-24 text-xs"
    >
      <div class="flex gap-8">
        <div class="flex flex-col gap-5 items-start pt-4 md:pt-0 self-center">
          <h1
            class="title-Font text-white text-left text-base md:text-2xl leading-10 font-medium capitalize"
          >
            Your HomeTurf

            <br />
            Wallet
          </h1>
          <div
            class="flex flex-row md:flex-row self-start gap-4 md:-mb-44 md:mt-5 items-start md:items-center justify-start"
          >
            <TurfButton
              @click="toggleOpen"
              size="large"
              class=""
              color="primary"
              ><span class="text-xs capitalize"
                >Withdraw Funds
              </span></TurfButton
            >
            <TurfButton size="large" class="" color="primary"
              ><span class="text-xs capitalize"
                >Request Payment Slip
              </span></TurfButton
            >
          </div>
        </div>
      </div>

      <div class="mt-8 md:mt-24">
        <div
          class="bg-primary rounded-xl p-6 flex flex-col justify-between w-full md:w-80 h-44 -mb-32"
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
    <div class="grid grid-cols-2 mb-12 pl-4 md:pl-12">
      <div
        class="col-span-2 md:col-span-1 mt-24 flex flex-col gap-9 md:justify-end text-left self-end"
      >
        <form class="w-10/12 md:w-full flex flex-col gap-6" action="">
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

    <TurfModal v-if="bankModal" @close="bankModal = false">
      <template v-slot:header>
        <h4 class="md:text-xl font-bold">Add Beneficiary</h4></template
      >
      <form
        @submit.prevent="addBeneficiary"
        class="w-full justify-center px-4 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-2 items-center h-auto overflow-y-scoll"
      >
        <BankSelect
          class="w-full col-span-1"
          :value="args.bankName"
          @update="updateArgs($event)"
        />
        <TurfInput
          class="w-full"
          placeholder="Account Number"
          :forSelect="false"
          v-model="args.accountNumber"
          type="number"
          :maxLength="10"
          required
        ></TurfInput>
        <!-- <TurfInput
          class="w-full hidden"
          placeholder="Account Name"
          :forSelect="false"
          v-model="args.accountName"
        ></TurfInput> -->

        <TurfButton type="button" class="w-full" variant="outlined"
          >Cancel</TurfButton
        >
        <TurfButton type="submit" class="w-full">Submit</TurfButton>
      </form>
    </TurfModal>

    <TurfModal v-if="withdrawModal" @close="withdrawModal = false">
      <template v-slot:header>
        <h4 class="md:text-xl font-bold">Withdraw to bank</h4></template
      >
      <form
        @submit.prevent="withdrawFunds"
        class="w-full justify-center px-4 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-2 items-center h-auto overflow-y-scoll"
      >
        <BankSelect
          class="w-full col-span-1"
          :data="customBankData"
          :value="args.accountName"
          :withdrawal="true"
          :beneficiary="true"
          :addBankData="true"
          @update="updateArgs($event)"
        />
        <TurfInput
          class="w-full"
          placeholder="Amount"
          :forSelect="false"
          :format="true"
          v-model="withdrawalAmount"
          type="text"
          required
        ></TurfInput>

        <TurfButton type="button" class="w-full" variant="outlined"
          >Cancel</TurfButton
        >
        <TurfButton type="submit" class="w-full">Submit</TurfButton>
      </form>
    </TurfModal>

    <TurfLoader v-if="loading" />
  </main>
</template>

<script setup>
import { useDataStore } from "@/stores/data.js";
import { helperFunctions } from "@/composable/HelperFunctions";
import banks from "@/utils/banks";

import BankSelect from "@/components/BankSelect.vue";
import TurfButton from "@/components/ButtonNew.vue";
import TurfInput from "@/components/TextInput.vue";
import { useToast } from "vue-toastification";

import { computed, onMounted, ref } from "vue";

const { formatAmount } = helperFunctions;

const store = useDataStore();
const toast = useToast();

const { mutate, query } = store;
const agentProfile = computed(() => store.getAgentData);
const beneficiaries = computed(() => store.getBeneficiary);
const bankModal = ref(false);
const loading = ref(false);

const bankUrl = (name) => {
  if (name) {
    const data = banks.filter((x) => {
      return name.toLowerCase().indexOf(x.name.toLowerCase()) > -1 ? x : "";
    });
    return data[0];
  } else {
    return {
      logo: "",
    };
  }
};
const customBankData = computed(() => {
  let data = [];
  data =
    beneficiaries.value &&
    beneficiaries.value.map((bank) => {
      return {
        name: bank.bankName,
        code: bank.bankCode,
        logo: bankUrl(bank.bankName).logo,
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
      };
    });

  return data;
});

async function queryAgents() {
  await query({
    endpoint: "FetchAgent",
    payload: {},
    service: "GENERAL",
    storeKey: "agentData",
  });
}
const withdrawalAmount = ref(0);
const args = ref({
  accountName: "",
  accountNumber: "",
  bankCode: "",
  bankName: "",
});
function updateArgs(e) {
  args.value.bankName = e.name;
  args.value.accountName = e.accountName;
  args.value.accountNumber = e.accountNumber;
  args.value.bankCode = e.code;
}

async function addBeneficiary() {
  try {
    loading.value = true;

    let res = await mutate({
      endpoint: "AddBeneficiary",
      data: {
        input: args.value,
      },
      service: "GENERAL",
    });
    if (res && res.success) {
      bankModal.value = false;
      toast.success("Beneficiary added successfully");
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

async function withdrawFunds() {
  try {
    loading.value = true;

    let res = await mutate({
      endpoint: "WithdrawFunds",
      data: {
        input: {
          bankCode: args.value.bankCode,
          accountNumber: args.value.accountNumber,
        },
        amount: withdrawalAmount.value,
      },
      service: "GENERAL",
    });
    if (res && res.success) {
      bankModal.value = false;
      withdrawModal.value = false;
      toast.success(res.message);
    } else if (res && !res.success) {
      toast.error(res.message);
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

async function queryBeneficiary() {
  try {
    await query({
      endpoint: "FetchBeneficiary",
      payload: {},
      service: "GENERAL",
      storeKey: "beneficiary",
    });
  } catch (e) {
    console.log(e);
  }
}

const withdrawModal = ref(false);
function toggleOpen() {
  if (beneficiaries.value && beneficiaries.value.length) {
    withdrawModal.value = true;
    return;
  }
  bankModal.value = true;
}
onMounted(async () => {
  await queryAgents();
  await queryBeneficiary();
});
</script>

<style></style>
