<template>
  <main class="w-full">
    <div class="flex justify-around w-full bg-secondary pb-10 text-xs">
      <div class="flex flex-col gap-5 items-start self-center">
        <h1
          class="text-white text-left text-2xl leading-10 font-medium capitalize"
        >
          Agent <br />
          Michael Anorue
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
            <span class="text-xl">40</span> <br />
            Houses under <br />
            your watch
          </p>

          <p class="text-secondary text-xs text-center">
            <span class="text-xl">24</span><br />
            Houses under <br />
            your watch
          </p>
        </div>

        <img
          class="-mb-32 bg-contain mt-12 w-52 h-72"
          src="@/assets/img/profile.png"
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
        <h3 class="text-secondary text-left">Houses under you</h3>

        <div class="my-4 flex flex-wrap gap-5">
          <div
            v-for="(d, i) in data"
            :key="i"
            @click="
              $router.push({ name: 'SingleProperty', params: { id: 'test' } })
            "
            class="flex flex-col gap-3"
          >
            <img
              class="bg-contain h-64 w-60"
              src="@/assets/img/house-1.png"
              alt=""
            />

            <p
              style="color: #a1a1a1"
              class="text-lightText text-left text-xs leading-5"
            >
              {{ d.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import TurfButton from "@/components/ButtonNew.vue";

const data = ref([
  {
    name: " Michael Coke Estate",
    num: 1,
  },
  {
    name: " Michael Coke Estate",
    num: 2,
  },
  {
    name: " Michael Coke Estate",
    num: 1,
  },
  {
    name: " Michael Coke Estate",
    num: 2,
  },
  {
    name: " Michael Coke Estate",
    num: 1,
  },
]);
</script>

<style></style>
