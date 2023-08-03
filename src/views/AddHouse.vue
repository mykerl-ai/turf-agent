<template>
  <div class="w-full h-full grid grid-cols-2 justify-between">
    <div
      @click="$refs.input.click()"
      class="flex flex-col w-full justify-start gap-3 ml-8 self-center"
    >
      <div v-if="url && url.length" class="w-10/12 h-80 p-4">
        <img class="w-full h-full" :src="url[0]" alt="" />
      </div>

      <div class="gap-3 flex justify-start items-center flex-wrap flex-row">
        <img
          v-for="(u, i) in url"
          :key="i"
          class="cursor-pointer w-32 contain"
          :class="!url.length || i == 0 ? 'hidden' : 'block'"
          :src="u"
          alt=""
        />
      </div>
      <div v-if="!url.length" class="w-full flex justify-center">
        <img class="cursor-pointer w-64" src="@/assets/img/upload.png" alt="" />
      </div>
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

    <form
      @submit.prevent="uploadHouse"
      class="bg-backgrd pb-32 flex flex-col gap-6 text-left p-6 overflow-x-hidden round w-11/12"
    >
      <div class="flex w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">Name </label>
        <TurfInput
          readonly
          v-model="args.username"
          class="text-white"
        ></TurfInput>
      </div>

      <div class="flex w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">Address </label>
        <TurfInput v-model="args.address" class="text-white"></TurfInput>
      </div>
      <div class="flex w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">House Type </label>
        <TurfInput v-model="args.houseType" class="text-white"></TurfInput>
      </div>

      <div
        v-for="(form, index) in forms"
        :key="index"
        class="grid grid-cols-2 w-11/12 text-left gap-6 self-start"
        :class="
          forms.length > 1 && index !== forms.indexOf(forms[forms.length - 1])
            ? 'bg-primary'
            : undefined
        "
      >
        <!-- Your form content goes here -->
        <!-- <input type="text" v-model="form.name" placeholder="Name" />
      <input type="email" v-model="form.email" placeholder="Email" /> -->

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >NUmber of Bedroom
          </label>
          <TurfInput
            class="text-white"
            v-model="forms[index].bedRoom"
          ></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for="">Number of Toilet</label>
          <TurfInput
            class="text-white"
            v-model="forms[index].toilet"
          ></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Number of Bathroom</label
          >
          <TurfInput
            class="text-white"
            v-model="forms[index].bathRoom"
          ></TurfInput>
        </div>

        <div class="flex col-span-2 flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Write a short note
          </label>
          <TurfText
            class="text-white"
            v-model="forms[index].description"
          ></TurfText>
        </div>
      </div>
      <button
        type="button"
        class="rounded-2xl w-32 p-2 col-span-2 bg-secondary text-white"
        @click="addForm"
      >
        +
      </button>

      <TurfButton size="large" class="w-full" color="primary"
        ><span class="text-xs capitalize">Upload</span></TurfButton
      >
    </form>

    <!-- Plus button to add a new form -->
    <TurfLoader v-if="loading" />
  </div>
</template>

<script setup>
import TurfInput from "@/components/TextInput.vue";
import TurfButton from "@/components/ButtonNew.vue";

import TurfText from "@/components/TextArea.vue";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useToast } from "vue-toastification";

import { useDataStore } from "@/stores/data.js";
// import { useRouter } from "vue-router";
import { ref, computed, defineProps, onMounted } from "vue";

const store = useDataStore();
// const router = useRouter();
const toast = useToast();

const { mutate } = store;
const { uploadFileToServer, convertFileToBase64 } = helperFunctions;

const props = defineProps({
  allowedTypes: {
    default: ["jpg", "pdf"],
  },
});

let message = ref("");
let fileName = ref("");
let fileSize = ref("");
const url = ref([]);
const loading = ref(false);
const error = ref(false);
const hide = ref(true);
const inputFile = ref(null);
const input = ref(null);
// const dateInput = ref("");
const uploadFile = ref([]);
const forms = ref([
  {
    bathRoom: "",
    bedRoom: "",
    description: "",
    requirement: "",
    rules: "",
    toilet: "",
  },
]);

const addForm = () => {
  forms.value.push({
    bathRoom: "",
    bedRoom: "",
    description: "",
    requirement: "",
    rules: "",
    toilet: "",
  }); // Add an empty form
};

const args = ref({
  address: "",
  agentId: "",
  fileUrl: [],
  homeDetails: [
    {
      bathRoom: "",
      bedRoom: "",
      description: "",
      requirement: "",
      rules: "",
      toilet: "",
    },
  ],
  paymentType: "YEARLY",
  houseType: "",
  price: "",
  statusType: "AVAILABLE",
  username: "",
});

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

function readBlobAsDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataURL = event.target.result;
      url.value.push(dataURL);
      resolve();
    };
    reader.onerror = function (event) {
      reject(event.target.error);
    };
    reader.readAsDataURL(blob);
  });
}
async function readFilesSequentially(files) {
  for (const b of files) {
    if (b instanceof Blob) {
      await readBlobAsDataURL(b);
    }
  }
}

async function previewFiles(e) {
  //   console.log(e.target.files[0], "FILE TARGET");
  if (e) {
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
    readFilesSequentially(files);
    // let reader = new FileReader();

    // reader.onloadend = (e) => {
    //   // data url
    //   url.value = e.target.result;
    // };
    // for (let b of files) {
    //   if (b instanceof Blob) reader.readAsDataURL(b);
    // }
    // console.log(url.value);
  }
}

async function uploadHouse() {
  args.value.homeDetails = forms.value;
  try {
    loading.value = true;

    if (uploadFile.value && uploadFile.value.length) {
      const txt = await uploadFileToServer([...uploadFile.value]);
      if (!txt) {
        throw new Error("Image upload failed");
      }
      args.value.fileUrl = txt;
    }

    let res = await mutate({
      endpoint: "CreateAgentUploadHouse",
      data: {
        input: args.value,
      },
      // service: "EMP",
    });
    console.log(res, "reso");
    if (res.username) {
      toast.success("Upload successful");
    }
  } catch (e) {
    console.log(e);
    toast.error(e.message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  args.value.agentId = window.localStorage.getItem("userId");
});
</script>

<style>
.round {
  border-radius: 0rem 0rem 0rem 12.5rem;
  background: #f5f5f5;
}
</style>
