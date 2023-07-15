<template>
  <main>
    <div class="relative mt-1" v-bind="$attrs">
      <span
        v-if="label"
        class="absolute left-5 py-0 -top-2 px-5 bg-white text-sm text-newGray capitalize"
      >
        {{ label }}
      </span>
      <div
        class="bg-white w-full font-medium text-sm leading-2 focus:outline-none border block appearance-none rounded-2xl focus:border-boxBorder"
        aria-readonly
        id="grid-state"
        @click.self="isSelect = !isSelect"
        :class="`${value ? '  text-dark-700' : '  text-dark-500'} ${
          isSelect ? 'border-boxBorder' : 'border-dark-200 py-3 px-4'
        }`"
      >
        <form v-if="isSelect" action="" class="relative w-full z-10 top-0">
          <easiTextInput
            v-model="searchQuery"
            @keyup="searchFunction"
            autofocus
            :forSelect="true"
          ></easiTextInput>
        </form>
        <span class="relative w-11/12" @click.self="isSelect = true" v-else>
          {{
            !optionArray.length
              ? placeholder
              : formatValue(optionArray)
                  .toString()
                  .replace("[", "")
                  .replace("]", "")
                  .replace(/,(?=[^\s])/g, ", ")
          }}</span
        >

        <ul
          v-show="isSelect"
          class="mt-5 z-20 w-full absolute top-8 right-0 py-1 shadow-md bg-white shadow-2xl h-40 overflow-y-scroll"
        >
          <div
            v-if="selectAll"
            @click="addAll()"
            class="hover:bg-newLimeGreen w-full cursor-pointer flex items-center mb-2 gap-2"
          >
            <input
              :checked="allChecked || allSelected"
              class="mx-4 my-2"
              type="checkbox"
              name=""
              id=""
            />
            <span class="uppercase font-medium text-xs">Select All</span>
          </div>
          <li
            v-for="option in optionData"
            :key="option"
            class="cursor-pointer text-sm text-dark"
            :class="optionArray.includes(option.value) ? ' bg-none ' : ''"
            @click="update(option.value)"
          >
            <div class="flex items-center gap-2">
              <input
                :checked="optionArray.includes(option.value)"
                class="mx-4 my-2"
                type="checkbox"
                name=""
                id=""
                :value="option"
              />
              <span class="cursor-pointer"> {{ option.label }}</span>
            </div>
            <hr class="my-2 text-dividerColor" />
          </li>

          <li
            v-show="addOpt"
            @click="emitBool"
            class="px-4 py-2 cursor-pointer hover:bg-mint text-sm flex gap-x-3 items-center border-b border-dividerColor"
          >
            <span><i class="fas fa-plus text-primary"></i></span>
            <span class="text-dark-800 text-sm hover:text-primary">{{
              addOptText
            }}</span>
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

    <div v-if="showOptions" class="flex gap-2 my-3 items-center">
      <div
        v-for="opt in optionArray"
        :key="opt"
        class="flex items-center flex-wrap justify-between gap-2 rounded-lg border border-lightBorder px-2 py-1 text-center bg-lightOrange w-20 text-xs text-dark-900"
      >
        {{ opt }}
        <i @click="update(opt)" class="fas fa-minus-circle"></i>
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
import { ref, reactive, nextTick, watch, computed } from "vue";
const props = defineProps({
  value: {
    default: [],
  },
  selectAll: {
    type: Boolean,
    default: true,
  },
  error: {
    type: [String, Boolean],
    default: false,
  },
  clearAll: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default() {
      return [];
    },
  },
  showOptions: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Select",
  },
  label: {
    type: String,
    default: "",
  },
  addOptText: {
    type: String,
    default: "",
  },
  addOpt: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update", "addNew"]);
const optionArray = ref([]);

const searchQuery = ref("");
const isSelect = ref(false);
const optionData = ref([]);
const propOptions = computed(() => props.options);

optionData.value = propOptions.value;

const allChecked = ref(false);
const allSelected = ref(false);

const clearArr = computed(() => props.clearAll);

watch(
  propOptions,
  (val) => {
    if (val) {
      optionData.value = val;
    }
  },
  { deep: true }
);

watch(
  clearArr,
  (newVal, oldVal) => {
    console.log(newVal, oldVal, "PROPS.VALUE");
    allChecked.value = false;
    allSelected.value = false;
    optionArray.value = [];
  },
  { deep: true }
);

if (props.value && props.value.length) {
  optionArray.value = props.value.map((el) => el);
}

function emitBool() {
  emit("addNew");
}

function addAll() {
  allChecked.value = !allChecked.value;
  allSelected.value = !allSelected.value;
  optionArray.value.splice(0);
  if (allChecked.value) {
    props.options.forEach((el) => {
      optionArray.value.push(el.value);
    });
  }
  optionArray.value = [...new Set(optionArray.value)];
  // optionData.value = optionArray.value;
  emit("update", optionArray.value);
}

watch(
  isSelect,
  (val) => {
    console.log(val);
    if (val === true) {
      optionData.value = props.options;
    } else {
      optionData.value = props.options;
    }
  },
  { deep: true }
);
function searchFunction(e) {
  const name = e.target.value;
  let data;
  if (name.length) {
    if (e.key !== "Backspace") {
      data = props.options.filter((x) => {
        return x.label.toLowerCase().indexOf(name.toLowerCase()) > -1
          ? x.label
          : "";
      });
    } else {
      console.log(searchQuery.value);
      data = props.options.filter((x) => {
        return x.label.toLowerCase().indexOf(searchQuery.value.toLowerCase()) >
          -1
          ? x.label
          : "";
      });
    }

    if (data.length) {
      optionData.value = data;
      return data;
    }
  } else {
    optionData.value = props.options;
  }
}
function formatValue(val) {
  let values = [];
  for (let opt of props.options) {
    for (let item of val) {
      if (opt.value === item) {
        values.push(opt.label);
      }
    }
  }

  const newVal = values.map((a) => {
    if (a) {
      return a.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
      });
    }
  });
  return newVal;
}
async function update(param) {
  if (param) {
    if (optionArray.value.includes(param)) {
      // const newArr = [...optionArray.value.filter((opt) => param !== opt)];
      let index = optionArray.value.indexOf(param);
      if (index > -1) {
        optionArray.value.splice(index, 1);
      }
      console.log(param, "Removed From", optionArray);
    } else {
      optionArray.value.push(param);
      nextTick();
    }

    emit("update", optionArray.value);
  }
}
</script>

<style></style>
