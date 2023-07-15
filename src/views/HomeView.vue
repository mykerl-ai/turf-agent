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
    <div class="full mt-12 mb-5 px-8 flex items-center justify-between">
      <h3 class="text-sm text-secondary">House Information</h3>
    </div>
    <div class="w-full my-6 px-4">
      <div
        class="relative grid grid-cols-3 rounded-xl text-secondary w-full justify-between py-3 px-8"
      >
        <div
          class="grid grid-cols-3 col-span-3 mb-5 rounded-xl border border-greyBorder text-secondary w-full justify-between py-5 text-xs px-8"
        >
          <p class="w-full capitalize text-xs text-left">name</p>
          <p class="capitalize text-xs text-left justify-self-end">status</p>
          <p class="capitalize text-xs text-left justify-self-end">options</p>
        </div>

        <div
          class="relative bg-backgrd grid grid-cols-3 w-full rounded-xl my-2 col-span-3 py-2 px-4"
        >
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 bg-secondary rounded-full"></div>
            <p class="text-xs text-secondary capitalize">michael anorue</p>
          </div>
          <div class="flex justify-self-end text-xs items-center">
            <p class="capitalize text-xs text-error font-bold text-left">
              taken
            </p>
          </div>

          <div class="flex justify-self-end mr-8 items-center">
            <p class="capitalize text-xs text-left">edit</p>
          </div>
          <div
            class="absolute right-0 top-0 h-full rounded-r-xl w-4 bg-error"
          ></div>
        </div>

        <div
          class="relative bg-backgrd grid grid-cols-3 w-full rounded-xl my-2 col-span-3 py-2 px-4"
        >
          <div class="flex items-center gap-3 w-full">
            <div class="w-10 h-10 bg-secondary rounded-full"></div>
            <p class="text-xs text-secondary capitalize">michael anorue</p>
          </div>
          <div class="flex justify-self-end text-xs items-center">
            <p class="capitalize text-xs font-bold text-success text-left">
              open
            </p>
          </div>

          <div class="flex justify-self-end mr-8 items-center">
            <p class="capitalize text-xs text-left">edit</p>
          </div>
          <div
            class="absolute right-0 top-0 h-full rounded-r-xl w-4 bg-success"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import TurfButton from "@/components/ButtonNew.vue";
</script>

<style></style>
