<template>
  <div class="w-full">
    <div
      class="py-3 px-10 w-full bg-[#DCE8E3] flex items-center justify-between"
    >
      <div @click="$router.push({ name: 'Real' })" class="cursor-pointer w-24">
        <img
          class="shadow-xl w-12 h-12 rounded-full"
          src="@/assets/icon/logo.svg"
          alt=""
        />
      </div>

      <div class="md:hidden w-auto">
        <img class="w-12" src="@/assets/icon/hamburger.svg" alt="" />
      </div>

      <div
        class="hidden md:flex gap-x-5 cursor-pointer items-center title-Font"
      >
        <span
          @click="$router.push({ name: 'About' })"
          class="text-primary font-bold text-xs"
          >ABOUT US</span
        >
        <span
          @click="$router.push({ name: 'Login' })"
          class="text-primary font-bold text-xs"
          >LOGIN</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
