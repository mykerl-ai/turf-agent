<template>
  <main class="w-full">
    <div class="flex justify-around w-full bg-secondary pb-10 text-xs">
      <div class="flex flex-col -ml-32 gap-5 items-start self-center">
        <h1
          class="text-white text-left text-2xl leading-10 font-medium capitalize"
        >
          Agent <br />
          {{ agentProfile.username }}
        </h1>
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
              (listOfHouses && listOfHouses.length) || 0
            }}</span>
            <br />
            Houses under <br />
            your watch
          </p>

          <p class="text-secondary text-xs text-center">
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
          class="-mb-32 bg-cover mt-12 w-52 h-72"
          :src="avatar"
          alt=""
        />

        <img
          v-else
          class="-mb-32 bg-contain mt-12 w-52 h-72"
          :src="agentProfile.profileImage"
          alt=""
        />
      </div>
    </div>
    <div class="w-full px-8 my-8">
      <div
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
            class="flex flex-col gap-3"
          >
            <img
              v-if="hd.fileUrl.length"
              class="bg-contain h-64 w-60"
              :src="
                hd.fileUrl[0].includes('https') ? hd.fileUrl[0] : hd.fileUrl[1]
              "
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
