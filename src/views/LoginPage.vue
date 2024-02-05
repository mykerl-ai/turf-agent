<template>
  <main
    class="grid w-full cursor-pointer-none h-screen grid-cols-1 md:grid-cols-3"
  >
    <div class="image md:inline-block hidden col-span-2">
      <img
        @click="$router.push({ name: 'Real' })"
        class="cursor-pointer shadow-inner p-6"
        src="@/assets/icon/logo.svg"
        alt=""
      />
    </div>
    <div class="backdrop w-full cursor-pointer-none h-screen relative">
      <div
        v-show="step != 1"
        @click="step = 1"
        class="top-8 absolute right-9"
        style="z-index: 999"
      >
        <svg
          width="33"
          height="31"
          viewBox="0 0 33 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4038 26.8221C14.1473 27.7778 14.1473 29.3274 13.4038 30.2832C12.6603 31.2389 11.455 31.2389 10.7115 30.2832L0.557634 17.2304C-0.185881 16.2746 -0.185881 14.7253 0.557634 13.7695L10.7115 0.716839C11.455 -0.238943 12.6603 -0.238943 13.4038 0.716839C14.1473 1.67262 14.1473 3.22197 13.4038 4.17775L6.50018 13.0526L31.0962 13.0526C32.1476 13.0526 33 14.1484 33 15.5C33 16.8516 32.1476 17.9473 31.0962 17.9473L6.50018 17.9473L13.4038 26.8221Z"
            fill="white"
          />
        </svg>
      </div>
      <div style="z-index: 1" class="z-50">
        <div class="z-50 w-full">
          <p
            class="w-full text-white text-3xl leading-10 text-left mt-24 md:mt-32 ml-12 capitalize"
          >
            <span class="browse-font text-4xl font-medium text-primary">b</span
            ><span class="browse-font text-white">rowse</span> <br />
            <span class="text-white font-medium">
              Our Property <br />
              Listing Now!</span
            >
          </p>
          <!-- step one -->
          <form @submit.prevent="login" v-if="step === 1" class="w-full">
            <div class="md:mt-20 mt-16 ml-3 w-11/12">
              <input
                class="p-4 bg-none focus:outline-none text-xs border-b-2 bg-transparent w-full text-white font-medium border-primary placeholder-text-white::placeholder"
                type="email"
                required
                v-model="args.email"
                placeholder="Email"
              />
              <img
                class="invisible border-b-2 border-primary pl-7"
                src="@/assets/icons/register-arrow.svg"
                alt=""
              />
            </div>

            <div class="mb-8 ml-3 w-11/12">
              <input
                class="p-3 bg-none focus:outline-none border-b-2 bg-transparent w-full text-white font-medium border-primary placeholder-text-white::placeholder"
                type="password"
                required
                v-model="args.password"
                placeholder="Password "
              />
              <button class="mt-3 border-none focus:outline-none">
                <img
                  class="border-b-2 border-primary pl-7"
                  src="@/assets/icons/register-arrow.svg"
                  alt=""
                />
              </button>
            </div>

            <!-- <div class="grid justify-center">
              <svg
                width="29"
                height="6"
                viewBox="0 0 29 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="19" height="6" rx="3" fill="white" />
                <circle cx="26" cy="3" r="3" fill="#D1643A" />
              </svg>
            </div> -->
            <TurfButton class="font-normal mt-2 text-xs" fill="clear"
              >Forgot Password?</TurfButton
            >

            <TurfButton
              @click="signIn"
              class="font-normal mt-2 text-xs"
              fill="clear"
              >Sign in with google</TurfButton
            >

            <div class="mt-24">
              <div class="text-xs font-medium text-center text-white">
                Don't have an account?
                <span class="text-primary">Click below</span>
              </div>
              <div class="grid w-full px-4 mt-5 items-center">
                <div class="border-2 border-primary p-2 w-full rounded-2xl">
                  <TurfButton
                    @click="$router.push({ name: 'Register' })"
                    class="font-normal mt-0 w-full text-sm"
                    color="primary"
                    ><span class="font-medium text-white text-sm"
                      >Register now</span
                    ></TurfButton
                  >
                </div>
              </div>
            </div>
          </form>
          <!-- step one -->

          <!-- step two -->

          <div v-else class="w-full">
            <div
              class="mt-40 mb-8 ml-8 grid grid-flow-col gap-0 auto-cols-auto w-full"
            >
              <input
                class="p-2 bg-none focus:outline-none border-b-2 bg-transparent w-full text-white font-medium border-primary placeholder-text-white::placeholder"
                type="password"
                placeholder="Password "
              />
              <img
                class="border-b-2 border-primary pl-7"
                src="@/assets/icons/register-arrow.svg"
                alt=""
              />
            </div>

            <div class="grid justify-center">
              <svg
                width="29"
                height="6"
                viewBox="0 0 29 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="29"
                  y="6"
                  width="19"
                  height="6"
                  rx="3"
                  transform="rotate(-180 29 6)"
                  fill="white"
                />
                <circle
                  cx="3"
                  cy="3"
                  r="3"
                  transform="rotate(-180 3 3)"
                  fill="#D1643A"
                />
              </svg>
            </div>

            <div class="mt-40">
              <div class="grid w-full px-4 mt-5 items-center">
                <div class="border-2 border-primary p-2 w-full rounded-2xl">
                  <TurfButton
                    :auth="true"
                    class="font-normal mt-0 w-full text-sm"
                    color="primary"
                    ><span class="font-medium text-white text-sm"
                      >Sign In</span
                    ></TurfButton
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- step two -->
        </div>
      </div>
    </div>

    <TurfLoader v-if="loading" />
  </main>
</template>

<script setup>
import { useToast } from "vue-toastification";

import { useDataStore } from "@/stores/data.js";
import { useRouter } from "vue-router";
// import { useToast } from "vue-toastification";

const store = useDataStore();
const router = useRouter();
const toast = useToast();

const { mutate } = store;
import TurfButton from "@/components/ButtonNew.vue";
import { onMounted, ref } from "vue";

const step = ref(1);
const args = ref({
  email: "",
  password: "",
});
const loading = ref(false);

async function login() {
  try {
    loading.value = true;

    let res = await mutate({
      endpoint: "LoginAgent",
      data: {
        input: args.value,
      },
      service: "GENERAL",
    });
    console.log(res, "login");
    if (res && res.token) {
      toast.success("Login successful");
      window.localStorage.setItem("token", res.token);
      router.push({ name: "Home" });
    }
  } catch (e) {
    console.log(e);
    toast.error(e.message);
  } finally {
    loading.value = false;
  }
}

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  // You can now send the ID token to your backend for verification
  const idToken = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + idToken);
  // Perform further actions like sending the token to your backend server
}
function signIn() {
  let gapi = window.gapi;
  gapi.auth2.getAuthInstance().signIn().then(onSignIn);
}

onMounted(() => {
  let gapi = window.gapi;
  gapi.load("auth2", () => {
    gapi.auth2.init({
      client_id:
        "65980733720-a62vmdkjhsum5v9mr540trhuod9cb75r.apps.googleusercontent.com",
      scope: "email https://www.googleapis.com/auth/documents", // Define additional scopes if needed
    });
  });
});
</script>

<style scoped>
.image {
  /* position: absolute;
  top: 0;
  left: 0;
  bottom: 0; */
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/banner.png");
  background-size: cover;
  background-position: center;
}
.backdrop {
  /* position: absolute; */
  /* top: 0;
  left: 0;
  bottom: 0; */
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/map.png");
  background-size: cover;
  background-position: center;
  /* opacity: 0.8;  */
  z-index: 1;
  /* pointer-events: none; */
}
.backdrop::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -20;
  background: rgba(29, 53, 72, 0.8);
  /* pointer-events: none; */
}
input {
  background: transparent;
}
input::placeholder {
  color: white;
}
</style>
