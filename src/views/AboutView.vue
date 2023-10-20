<template>
  <div class="w-full">
    <TurfHeader />

    <div class="w-full title-Font p-8 md:p-16">
      <h2 class="text-primary text-left leading-7">
        <span class="text-secondary"
          >Our priority with you is to give you the best <br />
        </span>
        onboarding experience at Torf
      </h2>

      <div
        class="md:mt-16 mt-8 w-full justify-center flex md:flex-row flex-col items-center gap-8 md:gap-32"
      >
        <div
          :style="{
            backgroundImage: ' url(' + onboard + ')',
          }"
          style="
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          "
          class="rounded-xl w-full md:w-64 h-80"
        ></div>

        <div class="flex flex-col text-left gap-2">
          <h2 class="text-lg md:text-xl text-left">Onboarding</h2>
          <p class="text-xs leading-5">
            Finding the right apartment takes time and patiences <br />
            and with torf we understand that and we become part <br />
            of your jorney
          </p>

          <div class="flex flex-col gap-4 mt-4 w-full">
            <div
              v-for="text in onboarding"
              :key="text"
              class="flex items-center gap-2 w-full"
            >
              <img src="@/assets/icon/bullet.svg" alt="" />
              <span class="text-xs text-grey-dark">{{ text }} </span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="md:mt-24 mt-8 w-full justify-center flex md:flex-row flex-col flex-col-reverse items-center gap-8 md:gap-32"
      >
        <div class="flex flex-col text-left gap-2">
          <h2 class="text-lg md:text-xl text-left">Flexibility</h2>
          <p class="text-xs leading-5">
            With Torf your everyday comfort is our top most <br />
            priority we go the miles just to put a smile on your face
          </p>

          <div class="flex flex-col gap-4 mt-4 w-full">
            <div
              v-for="text in flexibility"
              :key="text"
              class="flex items-center gap-2 w-full"
            >
              <img src="@/assets/icon/bullet.svg" alt="" />
              <span class="text-xs text-grey-dark">{{ text }} </span>
            </div>
          </div>
        </div>
        <div
          :style="{
            backgroundImage: ' url(' + flexible + ')',
          }"
          style="
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          "
          class="rounded-xl w-full md:w-64 h-80"
        ></div>
      </div>

      <div
        class="md:mt-24 mt-8 w-full justify-center flex md:flex-row flex-col items-center gap-8 md:gap-32"
      >
        <div
          :style="{
            backgroundImage: ' url(' + pay + ')',
          }"
          style="
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          "
          class="rounded-xl w-full md:w-64 h-80"
        ></div>

        <div class="flex flex-col text-left gap-2">
          <h2 class="text-lg md:text-xl text-left">Payment Solution</h2>
          <p class="text-xs leading-5">
            Finding the right apartment takes time and patiences <br />
            and with torf we understand that and we become part <br />
            of your jorney
          </p>

          <div class="flex flex-col gap-4 mt-4 w-full">
            <div
              v-for="text in payment"
              :key="text"
              class="flex items-center gap-2 w-full"
            >
              <img src="@/assets/icon/bullet.svg" alt="" />
              <span class="text-xs text-grey-dark">{{ text }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-[#DD8B6B] text-base p-10 w-full title-Font text-secondary text-center"
    >
      We value your daily comfort and know you are royalty and with torf its all
      about you
    </div>

    <TurfFooter />
  </div>
</template>

<script setup>
import TurfHeader from "@/components/TurfHeader.vue";
import TurfFooter from "@/components/TurfFooter.vue";
import onboard from "@/assets/img/onboard.png";
import flexible from "@/assets/img/flexible.png";
import pay from "@/assets/img/pay.png";
import { ref } from "vue";

const onboarding = ref([
  "Provision of your tour guide and free transportation to apartments.",
  "Schedule a comfortable time with you tour guide",
  "Avalibilty of tour guide till your needs are satisfied",
]);

const flexibility = ref([
  "Schedule a payment and collection plan of rent",
  "Easy communication between all parties with our chat platform",
  "Maintenance personal at your finger tips",
]);

const payment = ref([
  "Property acquisition plan.",
  "Rent flexible payment plan",
  "Landlord salary structure plan.",
]);
</script>
