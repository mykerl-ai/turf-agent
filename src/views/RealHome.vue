<template>
  <div class="w-full md:h-screen">
    <TurfHeader />
    <div class="h-[28rem] w-full bg-[#D1643A] flex flex-col md:flex-row">
      <div class="relative h-full w-2/5 md:bg-[#ffffff] flex">
        <img
          src="@/assets/img/firstone.png"
          class="h-full w-full hidden md:block"
          alt=""
        />
        <div
          class="bg-[#333333] absolute w-80 h-16 top-32 md:top-40 -left-32 transform rotate-90 p-2 flex justify-center items-center"
        >
          <!-- <div class="bg-[#333333] absolute top-4 transform rotate-90 left-1"> -->
          <h1 class="text-white text-xs title-Font uppercase">
            How We Can <span class="text-[#D1643A]">Help</span>
          </h1>
          <!-- </div> -->
        </div>
      </div>
      <div
        class="h-full md:w-3/5 w-full bg-[#D1643A] text-white gap-5 title-Font flex flex-col justify-center items-center"
      >
        <h1 class="text-base text-center font-light">The House PR Agency</h1>
        <h1 class="text-5xl text-center font-bold">ALL THINGS</h1>
      </div>
    </div>
    <div class="h-[18rem] w-full bg-[#1D3548] flex flex-col md:flex-row">
      <div
        class="h-full md:w-1/2 w-full bg-[#1D3548] text-white gap-5 title-Font flex flex-col justify-center items-center"
      >
        <h1 class="text-5xl text-center font-bold">THAT MATTER</h1>
        <h1 class="text-base text-center font-light">In One Place</h1>
      </div>
      <div class="hidden md:block relative h-full w-1/2 bg-[#ffffff]">
        <img src="@/assets/img/secondone.png" class="h-full w-full" alt="" />
        <div class="flex flex-col gap-3 absolute top-0 right-0">
          <div class="bg-[#333333] w-96 py-3">
            <p class="-mb-4 text-center text-white title-Font text-xs">
              <span class="text-primary">B2B</span> Public Relations
            </p>
            <img src="@/assets/icon/lines-1.svg" alt="" />
          </div>
          <div class="bg-[#333333] w-96 py-3">
            <img src="@/assets/icon/lines-2.svg" alt="" />
          </div>

          <div class="bg-[#333333] w-96 py-3">
            <img src="@/assets/icon/lines-3.svg" alt="" />
          </div>

          <div class="bg-[#333333] w-96 py-3">
            <p class="-mb-4 text-center text-white title-Font text-xs">
              Media Relations <span class="text-primary">Management</span>
            </p>
            <img src="@/assets/icon/lines-1.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TurfHeader from "@/components/TurfHeader.vue";
</script>
