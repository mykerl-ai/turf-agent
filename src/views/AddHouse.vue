<template>
  <div class="w-full h-full grid grid-cols-1 md:grid-cols-2 justify-between">
    <div
      @click="$refs.input.click()"
      class="flex flex-col w-full justify-start my-3 md:my-0 gap-3 md:ml-8 self-center"
    >
      <!-- <div v-if="url && url.length" class="w-10/12 h-80 p-4">
        <img
          style="object-fit: contain"
          class="w-full h-full"
          :src="url[0]"
          alt=""
        />
      </div> -->

      <div class="gap-3 flex justify-start items-center flex-wrap flex-row">
        <img
          v-for="(u, i) in url"
          :key="i"
          class="cursor-pointer w-32 contain"
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
      @submit.prevent="
        $route.query && $route.query.task ? updateHouse() : uploadHouse()
      "
      class="bg-backgrd pb-32 flex flex-col mt-3 md:mt-0 gap-6 text-left pt-6 pl-6 pr-6 md:pt-6 md:pl-6 md:pr-6 overflow-x-hidden round md:w-11/12"
    >
      <div class="flex md:w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">Name </label>
        <TurfInput
          readonly
          v-model="args.username"
          class="text-white"
        ></TurfInput>
      </div>

      <div class="flex md:w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">Address </label>
        <TurfInput
          :readonly="$route.params.id === 'new' ? false : true"
          v-model="args.address"
          class="text-white"
        ></TurfInput>
      </div>
      <!-- <div class="flex md:w-11/12 flex-col gap-2">
        <label class="text-secondary text-xs" for="">House Type </label>
        <TurfInput v-model="args.houseType" class="text-white"></TurfInput>
      </div> -->

      <div
        v-for="(form, index) in forms"
        :key="index"
        class="grid grid-cols-2 md:w-11/12 text-left gap-6 self-start"
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
            >Number of Bedroom
          </label>
          <TurfInput class="text-white" v-model="form.bedRoom"></TurfInput>
        </div>

        <div v-if="$route.params.id === 'new'" class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for="">House Type </label>
          <!-- <TurfInput
            class="text-white"
            v-model="form.houseType"
          ></TurfInput> -->

          <TurfSelect
            :value="args.houseType"
            :options="houseOptions"
            @update="args.houseType = $event"
          ></TurfSelect>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for="">Price </label>
          <TurfInput
            type="text"
            :format="true"
            class="text-white"
            v-model="form.price"
          ></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for="">Number of Toilet</label>
          <TurfInput class="text-white" v-model="form.toilet"></TurfInput>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Number of Bathroom</label
          >
          <TurfInput class="text-white" v-model="form.bathRoom"></TurfInput>
        </div>

        <div class="flex col-span-2 flex-col gap-2">
          <label class="text-secondary text-xs" for=""
            >Write a short note
          </label>
          <TurfText class="text-white" v-model="form.description"></TurfText>
        </div>
      </div>
      <button
        v-show="$route.params.id === 'new'"
        type="button"
        class="rounded-2xl w-32 p-2 col-span-2 bg-secondary text-white"
        @click="addForm"
      >
        +
      </button>

      <TurfButton size="large" class="w-full md:w-11/12" color="primary"
        ><span class="text-xs capitalize">{{
          $route.params.id ? "Update" : "Upload"
        }}</span></TurfButton
      >
    </form>

    <!-- Plus button to add a new form -->
    <TurfLoader v-if="loading" />
  </div>
</template>

<script setup>
import TurfInput from "@/components/TextInput.vue";
import TurfButton from "@/components/ButtonNew.vue";
import TurfSelect from "@/components/SelectInput2.vue";

import TurfText from "@/components/TextArea.vue";
import { helperFunctions } from "@/composable/HelperFunctions";
import { useToast } from "vue-toastification";

import { useDataStore } from "@/stores/data.js";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, defineProps, onMounted } from "vue";

const store = useDataStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const { mutate, query } = store;
const { uploadFileToServer, convertFileToBase64 } = helperFunctions;

const props = defineProps({
  allowedTypes: {
    default: ["jpg", "pdf"],
  },
});
const listOfHouses = computed(() => store.getAgentHouses);
const homeWithDetails = computed(() => store.getSingleHomeDetail);
const houseToBeUpdated = ref({});
const args = ref({
  address: "",
  homeDetails: [
    {
      bathRoom: "",
      bedRoom: "",
      description: "",
      requirement: "",
      rules: "",
      toilet: "",
      paymentType: "YEARLY",
      price: "",
      statusType: "AVAILABLE",
      fileUrl: [],
    },
  ],
  houseType: "",
  username: "",
});

const agentProfile = computed(() => store.getAgentData);
function fetchHomeDetails(targetHomeDetailId) {
  const filteredData = listOfHouses.value
    .map((item) => {
      const filteredHomeDetails = item.homeDetails.filter(
        (homeDetail) => homeDetail._id === targetHomeDetailId
      );

      if (filteredHomeDetails.length > 0) {
        return {
          ...item,
          // homeDetails: filteredHomeDetails,
        };
      }

      return null;
    })
    .filter(Boolean);
  return filteredData[0];
}
const houseDetails = computed(() => fetchHomeDetails(route.params.id));

const message = ref("");
const fileName = ref("");
const fileSize = ref("");
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
    paymentType: "YEARLY",
    price: "",
    statusType: "AVAILABLE",
    fileUrl: [],
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
    paymentType: "YEARLY",
    price: "",
    statusType: "AVAILABLE",
    fileUrl: [],
  }); // Add an empty form
};

const houseOptions = ref([
  { label: "Bungalows", value: "BUNGALOWS" },
  { label: "Duplex", value: "DUPLEX" },
  { label: "Terrace Duplex", value: "TERRACE_DUPLEX" },
  { label: "Semi-detached Duplex", value: "SEMI_DETACHED_DUPLEX" },
  { label: "Fully-detached Duplex", value: "FULLY_DETACHED_DUPLEX" },
  { label: "Mansion", value: "MANSION" },
  { label: "Apartment/Condos", value: "APARTMENT_CONDOS" },
  { label: "Maisonette", value: "MAISONETTE" },
  { label: "Pent-house", value: "PENT_HOUSE" },
]);

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

async function queryAgents() {
  try {
    loading.value = true;

    await query({
      endpoint: "FetchAgent",
      payload: {},
      service: "GENERAL",
      storeKey: "agentData",
    });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await queryAgents();
  args.value.username = agentProfile.value.username;
});

async function uploadHouse() {
  let payload;
  try {
    loading.value = true;

    if (uploadFile.value && uploadFile.value.length) {
      const txt = await uploadFileToServer([...uploadFile.value]);
      if (!txt) {
        throw new Error("Image upload failed");
      }
      forms.value[forms.value.length - 1].fileUrl = txt;
    }
    args.value.homeDetails = forms.value;
    if (route.params.id !== "new") {
      payload = {
        fileUrl: args.value.homeDetails[0].fileUrl,
        statusType: args.value.homeDetails[0].statusType,
        bedRoom: args.value.homeDetails[0].bedRoom,
        toilet: args.value.homeDetails[0].toilet,
        bathRoom: args.value.homeDetails[0].bathRoom,
        description: args.value.homeDetails[0].description,
        rules: args.value.homeDetails[0].rules,
        requirement: args.value.homeDetails[0].requirement,
        paymentType: args.value.homeDetails[0].paymentType,
        price: Number(args.value.homeDetails[0].price),
      };
    }

    let res = await mutate({
      endpoint:
        route.params.id === "new"
          ? "CreateAgentUploadHouse"
          : "UpdateAgentUploadHouse",
      data:
        route.params.id === "new"
          ? {
              input: args.value,
            }
          : { updateAgentUploadHouseId: route.params.id, input: payload },
      // service: "EMP",
    });
    if (res._id) {
      toast.success(
        route.params.id === "new" ? "Upload successful" : "Updated successfully"
      );

      router.go(-1);
    }
  } catch (e) {
    console.log(e);
    toast.error(e.message);
  } finally {
    loading.value = false;
  }
}
async function queryHomeDetails() {
  try {
    loading.value = true;
    await query({
      endpoint: "FetchHomeDetailsById",
      payload: { fetchHomeDetailsByIdId: route.params.id },
      service: "GENERAL",
      storeKey: "singleHomeDetail",
    });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
async function queryHouses() {
  try {
    loading.value = true;
    await query({
      endpoint: "FetchHouses",
      payload: {},
      service: "GENERAL",
      storeKey: "agentHouses",
    });
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
async function updateHouse() {
  loading.value = true;
  try {
    args.value.homeDetails = [...forms.value];
    if (uploadFile.value && uploadFile.value.length) {
      const txt = await uploadFileToServer([...uploadFile.value]);
      if (!txt) {
        throw new Error("Image upload failed");
      }
      forms.value[forms.value.length - 1].fileUrl = txt;
    }

    let res = await mutate({
      endpoint: "UpdateHouse",
      data: {
        updateHouseId: route.params.id,
        input: args.value,
      },
      service: "GENERAL",
    });
    if (res && res._id) {
      await queryHouses();
      toast.success("House updated");
      forms.value = [
        {
          bathRoom: "",
          bedRoom: "",
          description: "",
          requirement: "",
          rules: "",
          toilet: "",
          paymentType: "YEARLY",
          price: "",
          statusType: "AVAILABLE",
          fileUrl: [],
        },
      ];
    }
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  if (route.params.id !== "new") {
    if (route.query.task) {
      await queryHouses();
      houseToBeUpdated.value = listOfHouses.value.find(
        (h) => h._id === route.params.id
      );
      args.value.address = houseToBeUpdated.value.address;
      args.value.houseType = houseToBeUpdated.value.houseType;
      // args.value.homeDetails = houseToBeUpdated.value?.homeDetails.map((h) => {
      //   return {
      //     bathRoom: h.bathRoom,
      //     bedRoom: h.bedRoom,
      //     description: h.description,
      //     fileUrl: h.fileUrl,
      //     paymentType: h.paymentType,
      //     price: h.price,
      //     requirement: h.requirement,
      //     rules: h.rules,
      //     statusType: h.statusType,
      //     toilet: h.toilet,
      //   };
      // });
    } else {
      await queryHomeDetails();
      args.value.address = houseDetails.value.address;

      forms.value[0].bedRoom = homeWithDetails.value.bedRoom;
      forms.value[0].bathRoom = homeWithDetails.value.bathRoom;
      forms.value[0].toilet = homeWithDetails.value.toilet;
      forms.value[0].price = homeWithDetails.value.price;
      forms.value[0].description = homeWithDetails.value.description;
      forms.value[0].paymentType = homeWithDetails.value.paymentType;
      forms.value[0].statusType = homeWithDetails.value.statusType;
      forms.value[0].requirement = homeWithDetails.value.requirement;
      forms.value[0].rules = homeWithDetails.value.rules;
    }
  }
});
</script>

<style>
.round {
  border-radius: 0rem 0rem 0rem 12.5rem;
  background: #f5f5f5;
}
</style>
