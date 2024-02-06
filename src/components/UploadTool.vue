<template>
  <main>
    <div v-if="profile && !pill && !proPic" class="flex flex-col gap-y-3">
      <div class="flex items-center gap-x-4">
        <div
          :style="{
            backgroundImage: ' url(' + url + ')',
          }"
          class="w-14 h-16 border-2 bg-cover bg-no-repeat border-secondary rounded-md"
        >
          <!-- <img v-if="url" class="w-full bg-contain h-full" :src="url" alt="" /> -->
        </div>
        <div class="flex flex-col gap-3">
          <span class="text-dark-800 font-medium text-sm md:text-base"
            >Upload Picture
            <span class="text-xs mx-1 font-normal"
              >(JPG, PNG Only) (2mb Maximum)</span
            ></span
          >

          <div class="flex gap-x-4">
            <div
              @click="$refs.input.click()"
              :class="fullWidth ? 'w-9/12 bg-white text-center' : 'w-24'"
              class="rounded-full border py-3 px-3 border-primary cursor-pointer flex items-center justify-center gap-x-3"
            >
              <!-- <i class="fas fa-upload text-gray mr-4"></i> -->
              <img src="@/assets/icons/newUpload.svg" alt="" />

              <span class="text-primary text-sm font-bold text-left">
                Upload</span
              >
            </div>
            <div
              v-if="url"
              @click="clearFiles"
              class="w-24 rounded-md border py-1 px-3 border-primary cursor-pointer flex items-center justify-center"
            >
              <i class="fas fa-times text-gray mr-4"></i>
              <span class="w-full text-dark-40 text-xs text-left"> Remove</span>
            </div>

            <input
              v-show="hide === false"
              ref="input"
              accept="image/png, image/gif, image/jpeg"
              @change="previewFiles($event)"
              type="file"
              class="custom-file-input"
            />
          </div>
          <div
            v-show="message.length > 0 && fileName.length === 0"
            class="flex justify-start gap-4 items-start"
          >
            <p class="text-xs font-medium text-error">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="tiny ? 'bg-highlight p-4 rounded rounded-lg' : ''"
      class="flex flex-col w-full"
      v-if="pill && !proPic && !profile"
    >
      <div class="flex gap-x-4 items-center w-full">
        <span :class="tiny ? 'text-xs font-medium' : 'text-sm'" class="">{{
          info
        }}</span>

        <div
          @click="$refs.input.click()"
          :class="tiny ? 'bg-white' : ''"
          class="w-auto flex-none text-center rounded-full border border-primary bg-newLimeGreen py-2 px-2 cursor-pointer"
        >
          <span
            :class="tiny ? 'text-xs' : 'text-sm'"
            class="w-auto md:hidden text-primary text-center font-bold"
          >
            {{ label }}</span
          >
          <span
            :class="tiny ? 'text-xs' : 'text-sm'"
            class="w-auto md:block hidden text-primary text-center font-bold"
            >{{ label }}
          </span>
        </div>

        <input
          v-show="hide === false"
          ref="input"
          accept="application/msword, application/vnd.ms-excel, application/csv,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,
  text/plain, application/pdf, image/*"
          @change="previewFiles($event)"
          type="file"
          class="custom-file-input"
        />
      </div>
      <div
        v-show="fileName.length > 0"
        class="flex justify-center gap-1 items-center self-center mt-2"
      >
        <div class="flex-none w-6 justify-center self-center">
          <img :src="icon" alt="" />
        </div>

        <p class="text-xs flex-none text-dark-900 w-4/12 break-all">
          {{ fileName }}

          <span class="text-xs flex-none text-gray ml-2">
            {{ fileSize }}
          </span>
        </p>
        <div
          v-if="url"
          @click="clearFiles"
          class="flex-none w-24 rounded-none border py-0.5 px-3 border-none cursor-pointer"
        >
          <span class="w-full text-dark-40 text-xs text-left">
            <i class="fas fa-times text-gray mr-4"></i>Remove</span
          >
        </div>
      </div>

      <div
        v-show="message.length > 0 && fileName.length === 0"
        class="flex justify-center gap-4 items-center"
      >
        <p class="text-xs font-medium text-error">{{ message }}</p>
      </div>
    </div>
    <div
      v-if="!pill && !profile && !proPic"
      class="flex justify-center items-center gap-4 mb-8 w-full"
    >
      <div class="flex flex-col justify-center items-center gap-y-3">
        <div class="flex flex-col gap-1">
          <span
            class="text-headerText font-normal text-center text-sm md:text-base"
            >{{ info }}
          </span>
          <span
            :class="hideType ? 'hidden' : ''"
            class="md:text-base text-sm text-headerText font-normal text-center mx-1"
            >(JPG, PNG and PDF Only) (2mb Maximum)</span
          >
        </div>

        <div class="flex gap-x-4 items-center">
          <div
            @click="$refs.input.click()"
            class="w-56 mt-2 text-center rounded-full border border-primary py-2 px-4 cursor-pointer"
          >
            <span
              class="w-full flex items-center gap-3 justify-center text-primary text-sm text-center font-medium"
            >
              <img class="w-6" src="@/assets/icons/upload-icon.svg" alt="" />

              <span>Choose File</span>
            </span>
          </div>
          <div
            v-if="url"
            @click="clearFiles"
            class="w-24 rounded-none border py-0.5 px-3 border-none cursor-pointer"
          >
            <span class="w-full text-dark-40 text-xs text-left">
              <i class="fas fa-times text-gray mr-4"></i>Remove</span
            >
          </div>
          <input
            v-show="hide === false"
            ref="input"
            accept="application/msword, application/vnd.ms-excel, application/csv,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,
  text/plain, application/pdf, image/*"
            @change="previewFiles($event)"
            type="file"
            class="custom-file-input"
          />
        </div>
        <div
          v-show="fileName.length > 0"
          class="flex justify-center gap-4 items-center mt-2"
        >
          <div class="w-6 justify-center self-center">
            <img :src="icon" alt="" />
          </div>

          <p class="text-xs text-dark-900">{{ fileName }}</p>
          <span class="text-xs text-gray">{{ fileSize }}</span>
        </div>

        <div
          v-show="message.length > 0 && fileName.length === 0"
          class="flex justify-center gap-4 items-center"
        >
          <p class="text-xs font-medium text-error">{{ message }}</p>
        </div>
      </div>
    </div>
    <div v-if="proPic && !pill && !profile">
      <div
        @click="$refs.input.click()"
        style="background-color: #b9bbc07d; border-color: #e0e0e08b"
        class="cursor-pointer border rounded-lg md:rounded-lg p-4 md:px-6 flex items-center text-white gap-2 md:gap-4"
      >
        <img class="w-4" src="@/assets/icons/upload-white.svg" alt="" />
        <span class="hidden md:inline font-medium text-base text-white"
          >Upload</span
        >
      </div>

      <input
        v-show="hide === false"
        ref="input"
        accept="application/msword, application/vnd.ms-excel, application/csv,  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint,
  text/plain, application/pdf, image/*"
        @change="previewFiles($event)"
        type="file"
        class="custom-file-input"
      />
    </div>
  </main>
</template>

<script setup>
import * as XLSX from "xlsx/xlsx.mjs";

import axios from "axios";
import { AUTH_CONTEXT } from "@/api/api";

import picIcon from "@/assets/icons/pic.svg";
import pdf from "@/assets/icons/pdf-file.svg";
import imageIcon from "@/assets/icons/image.svg";
import msword from "@/assets/icons/microsoft-word.svg";
import ViewDocuments from "@/components/Employee/View/Documents/Documents";

import { useRoute } from "vue-router";
import {
  ref,
  reactive,
  nextTick,
  watch,
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import { useToast } from "vue-toastification";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useDataStore } from "@/stores/data.js";
import { storeToRefs } from "pinia";

const { resetObj } = helperFunctions;

const store = useDataStore();
const { query, mutate } = store;
const { listEmployees, getAllEmployees } = storeToRefs(store);
const toast = useToast();

const route = useRoute();

const props = defineProps({
  profile: {
    type: Boolean,
    default: false,
  },
  clear: {
    type: Boolean,
    default: false,
  },
  hideType: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  pill: {
    type: Boolean,
    default: false,
  },
  tiny: {
    type: Boolean,
    default: false,
  },
  proPic: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  info: {
    type: String,
    default: "",
  },
  imageLink: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["fileUrl"]);

let updateSuccess = ref(false);
const uploadFile = ref(null);
let args = reactive({
  _id: "",
  companyId: "",
  employeeId: "",
  documentTitle: "",
  documentUrl: "",
});

const loading = ref({
  add: false,
  edit: false,
});
const icon = ref(null);
const hide = ref(true);
let message = ref("");
let fileName = ref("");
let fileSize = ref("");
let url = ref("");
const argsArray = ref([]);
const input = ref(null);
defineExpose({ input });

const imgLink = computed(() => props.imageLink);

watch(
  imgLink,
  (newVal, oldVal) => {
    url.value = props.imageLink;
  },
  { deep: true }
);

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function getFileType(typeofFile) {
  const ext = typeofFile.split("/").pop();
  if (ext === "png" || ext === "jpg" || ext === "jpeg") {
    return imageIcon;
  } else if (ext === "msword") {
    return msword;
  } else if (ext === "pdf") {
    return pdf;
  }
}

const clearFiles = () => {
  input.value.value = null;
  url.value = "";
  uploadFile.value = null;
  fileName.value = "";
  fileSize.value = "";
};

const propClear = computed(() => props.clear);

watch(propClear, (oldval, newVal) => {
  if (propClear.value) {
    console.log(propClear, "CLEARED");
    clearFiles();
  }
});
// let url = ref("");
function previewFiles(e) {
  //   console.log(e.target.files[0], "FILE TARGET");
  uploadFile.value = null;
  message.value = "";
  const file = e.target.files[0];
  uploadFile.value = file;
  console.log(file.type, "TYPEOFFILE");

  const allowedTypes = [
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
    "text/plain",
    "application/pdf",
    "image/png",
    "image/gif",
    "image/jpeg",
    "application/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  if (!allowedTypes.includes(file.type)) {
    message.value = "File type is wrong!!";
    throw new Error(message.value);
  }
  if (file.size > 2000000) {
    toast.error("Too large, max size allowed is 2MB");
    message.value = "Too large, max size allowed is 2MB";
    throw new Error(message.value);
  }

  icon.value = getFileType(file.type);
  const { name, size } = file;
  fileName.value = name;
  args.documentTitle = name;

  fileSize.value = formatBytes(size);
  let reader = new FileReader();

  reader.onloadend = (e) => {
    // data url
    url.value = e.target.result;
    // args.documentUrl = e.target.result;
  };
  reader.readAsDataURL(file);
  emit("fileUrl", uploadFile.value);

  // url = URL.createObjectURL(file);
  // uploadToServer();
}
onMounted(() => {
  fileName.value = "";
  fileSize.value = "";
  uploadFile.value = null;
  url.value = props.imageLink;
});
</script>

<style></style>
