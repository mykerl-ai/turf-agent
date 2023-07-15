<template>
  <div class="w-full h-full flex justify-between">
    <div class="flex flex-col w-full justify-center ml-32 self-center">
      <img class="cursor-pointer w-64" src="@/assets/img/upload.png" alt="" />
    </div>
    <div
      class="bg-backgrd pb-32 flex flex-col gap-6 text-left p-6 overflow-x-hidden round w-11/12"
    >
      <div class="flex w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">Name </label>
        <TurfInput class="text-white"></TurfInput>
      </div>

      <div class="flex w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">Address </label>
        <TurfInput class="text-white"></TurfInput>
      </div>
      <div
        v-for="(form, index) in forms"
        :key="index"
        class="grid grid-cols-2 w-11/12 text-left gap-6 self-start"
      >
        <!-- Your form content goes here -->
        <!-- <input type="text" v-model="form.name" placeholder="Name" />
      <input type="email" v-model="form.email" placeholder="Email" /> -->
        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for="">House Type</label>
          <TurfInput class="text-white" v-model="form.name"></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Number of Livingroom</label
          >
          <TurfInput class="text-white" v-model="form.email"></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >NUmber of Bedroom
          </label>
          <TurfInput class="text-white" v-model="form.name"></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Number of Toilet and Bathroom</label
          >
          <TurfInput class="text-white" v-model="form.name"></TurfInput>
        </div>

        <div class="flex col-span-2 flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Write a short note
          </label>
          <TurfText class="text-white" v-model="form.name"></TurfText>
        </div>
      </div>
    </div>

    <!-- Plus button to add a new form -->
    <button class="hidden" @click="addForm">+</button>
  </div>
</template>

<script setup>
import TurfInput from "@/components/TextInput.vue";
import TurfText from "@/components/TextArea.vue";

import { ref } from "vue";
const forms = ref([{ name: "", email: "" }]);

const addForm = () => {
  forms.value.push({ name: "", email: "" }); // Add an empty form
};
</script>

<style>
.round {
  border-radius: 0rem 0rem 0rem 12.5rem;
  background: #f5f5f5;
}
</style>
