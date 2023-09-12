<template>
  <main
    class="grid w-full cursor-pointer-none h-screen grid-cols-1 md:grid-cols-3"
  >
    <div class="image hidden md:inline-block col-span-2"></div>
    <div class="backdrop cursor-pointer-none h-screen relative">
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
            class="w-full text-white text-3xl leading-10 text-left mt-20 ml-12 capitalize"
          >
            <span class="browse-font text-4xl font-medium text-primary">b</span
            ><span class="browse-font text-white">rowse</span> <br />
            <span class="text-white font-medium">
              Our Property <br />
              Listing Now!</span
            >
          </p>
          <!-- step one -->
          <div v-if="step === 1" class="w-full">
            <form
              @submit.prevent="step = 2"
              class="mt-24 mb-8 ml-3 md:ml-8 grid grid-flow-row gap-6 auto-cols-auto w-full"
            >
              <input
                class="bg-none focus:outline-none p-3 md:p-3 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="Username"
                v-model="args.username"
                required
              />

              <input
                class="bg-none focus:outline-none p-3 md:p-3 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="password"
                placeholder="Password"
                v-model="args.password"
                required
              />

              <button
                class="bg-none focus:outline-none grid grid-flow-row auto-rows-auto gap-8 mt-4 justify-center"
              >
                <img
                  class="self-center justify-self-center"
                  src="@/assets/icons/register-arrow.svg"
                  alt=""
                />
                <svg
                  class="ml-2"
                  width="29"
                  height="6"
                  viewBox="0 0 29 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="19" height="6" rx="3" fill="white" />
                  <circle cx="26" cy="3" r="3" fill="#D1643A" />
                </svg>
              </button>
            </form>

            <div class="mt-10">
              <div class="text-xs font-medium text-center text-white">
                Have an account?
                <span class="text-primary">Click below</span>
              </div>
              <div class="grid w-full px-4 mt-5 items-center">
                <div class="border-2 border-primary p-2 w-full rounded-2xl">
                  <TurfButton
                    @click="$router.push({ name: 'Login' })"
                    class="font-normal mt-0 w-full text-xs"
                    color="primary"
                    ><span class="font-medium text-white text-xs"
                      >Sign In</span
                    ></TurfButton
                  >
                </div>
              </div>
            </div>
          </div>
          <!-- step one -->

          <!-- step two -->

          <form @submit.prevent="registerAgent" v-else class="w-full">
            <div
              class="mt-16 grid grid-flow-row ml-3 items-center gap-9 auto-rows-auto w-full"
            >
              <div
                @click="$refs.input.click()"
                :style="
                  url.length
                    ? null
                    : {
                        backgroundImage: 'url(' + avatar + ')',
                      }
                "
                style="
                  border-radius: 40px;
                  background-color: rgba(29, 53, 72, 0.5);
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain;
                "
                class="relative justify-self-center border border-primary md:w-32 md:h-32 w-28 h-28"
              >
                <img class="w-full h-full" v-if="url" :src="url" alt="" />
                <img
                  class="absolute top-24 -right-2"
                  src="@/assets/icons/add-icon.svg"
                  alt=""
                />
              </div>

              <input
                v-show="hide === false"
                ref="input"
                :accept="allowedTypes.toString()"
                @change="previewFiles($event)"
                type="file"
                class="custom-file-input"
                multiple
              />

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="First Name"
                v-model="args.firstName"
              />

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="Last Name"
                v-model="args.lastName"
              />

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="Middle Name"
                v-model="args.middleName"
              />

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="Phone Number"
                v-model="args.phone"
              />

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="email"
                placeholder="Email"
                v-model="args.email"
              />

              <div class="relative">
                <span
                  v-if="!args.dob.length && hideText == false"
                  class="absolute top-3 left-2 text-white text-xs font-medium"
                >
                  Date of Birth
                </span>
                <input
                  @focus="hideText = true"
                  :class="args.dob.length ? 'text-white' : 'text-transparent'"
                  class="bg-none hidden-placeholder focus:outline-none -ml-6 p-2 border-b-2 bg-transparent w-11/12 font-medium border-primary"
                  type="date"
                  v-model="args.dob"
                />
              </div>

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="State"
                v-model="args.state"
              />

              <input
                class="bg-none focus:outline-none p-2 border-b-2 bg-transparent w-11/12 text-white font-medium border-primary placeholder-text-white::placeholder text-xs"
                type="text"
                placeholder="Address"
                v-model="args.address"
              />
            </div>

            <button
              class="bg-none focus:outline-none grid grid-flow-row auto-rows-auto gap-8 mt-4 self-center w-full justify-center"
            >
              <img
                @click="step = 2"
                class="self-center justify-self-center"
                src="@/assets/icons/register-arrow.svg"
                alt=""
              />
              <svg
                class="ml-2"
                width="29"
                height="6"
                viewBox="0 0 29 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="19" height="6" rx="3" fill="white" />
                <circle cx="26" cy="3" r="3" fill="#D1643A" />
              </svg>
            </button>

            <div class="mt-10">
              <div class="text-sm font-medium text-center text-white">
                Have an account?
                <span class="text-primary">Click below</span>
              </div>
              <div class="grid w-full px-4 mt-5 items-center">
                <div class="border-2 border-primary p-2 w-full rounded-2xl">
                  <TurfButton
                    :auth="true"
                    @click="$router.push({ name: 'Home' })"
                    class="font-normal mt-0 w-full text-sm"
                    color="primary"
                    type="button"
                    ><span class="font-medium text-white text-lg"
                      >Sign In</span
                    ></TurfButton
                  >
                </div>
              </div>
            </div>
          </form>

          <!-- step two -->
        </div>
      </div>
    </div>
    <TurfLoader v-if="loading" />
  </main>
</template>

<script setup>
import TurfButton from "@/components/ButtonNew.vue";
import avatar from "@/assets/img/avatar.png";
import { ref, watch, computed, defineExpose, defineProps } from "vue";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useToast } from "vue-toastification";

import { useDataStore } from "@/stores/data.js";
import { useRouter } from "vue-router";
// import { useToast } from "vue-toastification";

const store = useDataStore();
const router = useRouter();
const toast = useToast();

const { mutate } = store;
const { uploadFileToServer, convertFileToBase64, processNumber } =
  helperFunctions;

const props = defineProps({
  allowedTypes: {
    default: ["jpg", "pdf"],
  },
});
console.log(props);
const step = ref(1);
const hide = ref(true);
const hideText = ref(false);
const loading = ref(false);
// const updateSuccess = ref(false);
// const emit = defineEmits(["fileUrl"]);
const args = ref({
  address: "",
  dob: "",
  email: "",
  firstName: "",
  lastName: "",
  middleName: "",
  phone: "",
  password: "",
  profileImage: "",
  state: "",
  username: "",
});

let message = ref("");
let fileName = ref("");
let fileSize = ref("");
const url = ref("");
let error = ref(false);
const inputFile = ref(null);
const input = ref(null);
// const dateInput = ref("");
const uploadFile = ref([]);

defineExpose({ input });
const imgLink = computed(() => props.imageLink);

watch(
  imgLink,
  () => {
    url.value = props.imageLink;
  },
  { deep: true }
);

const allowedTypes = computed(() => {
  let allowedTypes = [];
  if (props.type === "video") {
    allowedTypes = [
      "image/*;capture=camera",
      "video/*",
      "video/mp4",
      "video/quicktime",
    ];
  } else {
    if (props.allowedTypes) {
      props.allowedTypes.forEach((el) => {
        if (el == "pdf") {
          allowedTypes.push("application/pdf");
        } else if (el == "jpg") {
          allowedTypes.push("image/png", "image/jpeg", "image/gift");
        } else if (el == "excel") {
          allowedTypes.push(
            "text/csv",
            "application/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel"
          );
        } else if (el == "word") {
          allowedTypes.push("application/msword");
        }
      });
    } else {
      allowedTypes = [
        "text/csv",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.ms-powerpoint",
        "text/plain",
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/gif",
        "application/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
    }
  }
  return allowedTypes;
});

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function previewFiles(e) {
  //   console.log(e.target.files[0], "FILE TARGET");
  error.value = false;
  uploadFile.value = [];
  message.value = "";
  const files = e.target.files;
  inputFile.value = files;
  // uploadFile.value = e.target.files;
  for (let file of files) {
    const { name, size } = file;
    fileName.value = name;

    fileSize.value = formatBytes(size);
    const base64 = await convertFileToBase64(file);
    uploadFile.value.push(base64);
  }
  let reader = new FileReader();

  reader.onloadend = (e) => {
    // data url
    url.value = e.target.result;
  };
  reader.readAsDataURL(files[0]);
}
// function isValidBase64(str) {
//   try {
//     // Try to decode the Base64 string
//     const decodedString = atob(str);

//     // Encode the decoded string back to Base64
//     const reencodedString = btoa(decodedString);

//     // Check if the reencoded string is the same as the original input
//     return reencodedString === str;
//   } catch (error) {
//     // An error occurs when the input is not a valid Base64 string
//     return false;
//   }
// }

async function registerAgent() {
  args.value.phone = processNumber(String(args.value.phone));
  try {
    // if (isValidBase64(url.value)) {
    //   toast.success("Valid file");
    // } else {
    //   toast.error("Bad type");
    //   throw new Error("Wrong file type");
    // }
    loading.value = true;

    if (uploadFile.value && uploadFile.value.length) {
      const txt = await uploadFileToServer([...uploadFile.value]);
      args.value.profileImage = txt[0];
    }

    let res = await mutate({
      endpoint: "SignupAgent",
      data: {
        input: args.value,
      },
      // service: "EMP",
    });
    if (res && res.token) {
      toast.success("Sign up successful");
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

.hidden-placeholder::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.hidden-placeholder::-moz-calendar-picker-indicator {
  filter: invert(1);
}
.hidden-placeholder::-ms-calendar-picker-indicator {
  filter: invert(1);
}
.hidden-placeholder::calendar-picker-indicator {
  filter: invert(1);
}
</style>
