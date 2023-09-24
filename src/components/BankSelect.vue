<template>
  <main class="relative">
    <div class="relative mt-1" v-bind="$attrs">
      <span
        v-if="
          (label || placeholder) &&
          (isSelect || value || typeof value == 'boolean') &&
          placeholder != 'Select'
        "
        class="pointer-events-none absolute left-5 py-0 -top-3 px-5 bg-white text-xs text-newGray capitalize"
      >
        {{ label || placeholder }}
      </span>
      <div
        class="bg-white w-full font-medium text-left text-sm leading-2 focus:outline-none border block appearance-none rounded-2xl focus:border-boxBorder"
        aria-readonly
        id="grid-state"
        @click.self="isSelect = !isSelect"
        :class="`${value ? '  text-dark-700' : '  text-dark-500'} ${
          isSelect ? 'border-boxBorder' : 'border-dark-200 py-3 px-4'
        }`"
      >
        <form v-if="isSelect" action="" class="relative w-full z-20 top-0">
          <TurfInput
            v-model="searchQuery"
            @keyup="searchFunction"
            autofocus
            :forSelect="true"
          ></TurfInput>
        </form>
        <span
          class="relative text-left w-full"
          @click.self="isSelect = true"
          v-else
        >
          {{
            value == "" ? "Bank Name" : beneficiary ? selectedLabel : value
          }}</span
        >

        <ul
          v-show="isSelect"
          :class="autoHeight || optionData.length <= 5 ? 'h-40' : 'h-72'"
          class="mt-7 z-20 w-full absolute top-6 right-0 py-1 bg-white shadow-2xl overflow-y-scroll"
        >
          <li
            v-for="bank in optionData"
            :key="bank.code"
            class="cursor-pointer text-sm text-dark-800 hover:bg-secondary hover:text-white"
            :class="value == bank ? ' bg-secondary text-white' : ''"
            @click="update(bank)"
          >
            <div class="flex items-center gap-4 mx-4 my-2 py-3">
              <div class="items-center flex">
                <!-- <Avatar :image="bank.logo"></Avatar> -->
                <span
                  class="w-10 h-10 bg-blueGray-200 inline-flex items-center justify-center rounded-full border border-boxBorder"
                >
                  <img
                    alt="..."
                    class="w-full rounded-full contain align-middle"
                    :src="bank.logo"
                  />
                </span>
              </div>
              <span class="font-bold">
                {{ beneficiary ? bank.accountName : bank.name }}</span
              >
            </div>
          </li>
          <li
            v-show="addBankData"
            @click="emitBool"
            class="px-4 py-2 cursor-pointer hover:bg-secondary text-sm flex gap-x-3 items-center border-b border-dividerColor"
          >
            <span><i class="fas fa-plus text-secondary"></i></span>
            <span class="text-dark-800 text-sm hover:text-white"
              >Add Bank Account</span
            >
          </li>
        </ul>
      </div>
      <div
        v-if="!isSelect"
        @click="isSelect = !isSelect"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-dark-500"
      >
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>

    <div v-if="error" class="text-xs font-medium text-error -mt-2 mb-2">
      {{ error }}
    </div>
    <div
      @click="isSelect = false"
      :class="!isSelect ? 'pointer-events-none' : ''"
      class="bg-transparent fixed inset-0"
    ></div>
  </main>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onBeforeUpdate,
  defineProps,
  defineEmits,
} from "vue";
import TurfInput from "@/components/TextInput.vue";

import banks from "@/utils/banks";
const props = defineProps({
  value: {
    default: "",
  },

  data: {
    type: Array,
    default: () => [],
  },

  withdrawal: {
    type: Boolean,
    default: false,
  },
  addBankData: {
    type: Boolean,
    default: false,
  },

  autoHeight: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select",
  },

  error: {
    type: [String, Boolean],
    default: false,
  },
  beneficiary: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
});

let nigerianBanks = reactive([]);
const propsData = computed(() => props.data);

nigerianBanks = propsData.value.length > 0 ? propsData.value : banks;

onBeforeUpdate(() => {
  nigerianBanks = props.withdrawal ? propsData.value : banks;
});

const emit = defineEmits(["update", "showModal"]);

const searchQuery = ref("");
const isSelect = ref(false);
const optionData = ref([]);

optionData.value = nigerianBanks;

watch(propsData, (val) => {
  console.log(val, "new bank data");

  if (props.withdrawal) {
    nigerianBanks = val;
    optionData.value = nigerianBanks;
  }
});

watch(
  isSelect,
  (val) => {
    console.log(val);
    if (val === true) {
      optionData.value = nigerianBanks;
    } else {
      optionData.value = nigerianBanks;
    }
  },
  { deep: true }
);

function emitBool() {
  emit("showModal", true);
}
function searchFunction(e) {
  const name = e.target.value;
  let data;
  if (name.length) {
    if (e.key !== "Backspace") {
      data = nigerianBanks.filter((x) => {
        return x.name.toLowerCase().indexOf(name.toLowerCase()) > -1
          ? x.name
          : "";
      });
    } else {
      console.log(searchQuery.value);
      data = nigerianBanks.filter((x) => {
        return x.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) >
          -1
          ? x.name
          : "";
      });
    }

    if (data.length) {
      optionData.value = data;
      return data;
    }
  } else {
    optionData.value = nigerianBanks;
  }
}
const selectedLabel = ref("");

function update(value) {
  isSelect.value = !isSelect.value;
  if (props.withdrawal) {
    selectedLabel.value = value.accountName;
    emit("update", value);
  } else {
    emit("update", value);
  }
}
</script>

<style></style>
