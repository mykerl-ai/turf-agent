<template>
  <main>
    <div
      style="
        z-index: 999;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #043128c4;
      "
      class="inset-0 w-full -z-5 overflow-y-auto py-16"
    >
      <div
        class="md:w-2/5 w-11/12 z-10 mx-auto bg-none rounded-2xl overflow-y-auto shadow-xs"
      >
        <div
          class="bg-red w-full text-white font-medium flex justify-center items-center p-6 pb-2 text-2xl"
        >
          <slot name="heading" />
        </div>

        <main class="flex flex-col gap-7 mb-7 items-center">
          <div class="justify-center my-4 0 p-2 overflow-hidden">
            <!-- <img class="w-28 -mb-3" src="../../assets/img/loader.gif" alt="" /> -->
            <div class="w-full">
              <Icon :circle="true" />
              <!-- <img src="@/assets/img/loaderwhite.gif" alt="" /> -->
            </div>
          </div>

          <div class="px-0 text-xs font-bold text-white opacity-80">
            <slot name="message" />
          </div>
        </main>
      </div>
    </div>
  </main>
</template>

<script setup>
import Icon from "@/components/LoadIcon.vue";
// function close() {
//   emit("close");
//   //   window.location.reload();
// }
</script>

<style></style>
