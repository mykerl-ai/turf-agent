<template>
  <main>
    <div class="relative mt-1" v-bind="$attrs">
      <!-- <span v-if="label" class="floatingLabel">
        {{ label }}
      </span> -->
      <div
        @click.self="isSelect = !isSelect"
        class="bg-white font-medium text-sm leading-2 focus:outline-none border block appearance-none focus:border-boxBorder"
        :class="[
          `${value ? '  text-dark-700' : '  text-dark-500'} ${
            isSelect ? 'border-boxBorder' : 'border-dark-200 py-3 px-4'
          } ${extraCss}`,
          shrink ? 'w-12 md:w-full py-1 rounded-2xl' : 'w-full rounded-2xl',
        ]"
      >
        <form
          v-if="isSelect"
          action=""
          :class="shrink ? 'invisible' : undefined"
          class="relative w-full z-10 top-0"
        >
          <easiTextInput
            v-model="searchQuery"
            @keyup="searchFunction"
            autofocus
            :forSelect="true"
          ></easiTextInput>
        </form>
        <span class="relative w-11/12" @click.self="isSelect = true" v-else>
          {{ value == "" ? placeholder : getLabelFromValue(value) }}</span
        >

        <ul
          v-if="isSelect && !grid"
          class="z-20 w-full absolute right-0 shadow-md bg-white shadow-2xl"
          :class="[
            autoHeight || optionData.length <= 5
              ? 'h-auto  overflow-y-hidden'
              : 'h-52 overflow-y-scroll',
            dropdownStyle2,
          ]"
        >
          <li
            v-for="option in optionData"
            :key="option"
            class="cursor-pointer text-sm option-color"
            :class="[
              value == option.value ? ' bg-boxBorder text-white' : '',
              dropdownStyle,
            ]"
            @click="update(option)"
          >
            <div class="flex items-center gap-4 p-3">
              <img
                v-show="value !== option.value"
                src="@/assets/icons/unchecked-box.svg"
                alt=""
              />
              <img
                v-show="value === option.value"
                src="@/assets/icons/checked-square.svg"
                alt=""
              />
              <!-- <input
                class="mx-4"
                type="radio"
                name=""
                id=""
                :checked="value === option.value ? true : false"
                :value="option.value"
                v-model="optionString"
              /> -->
              <span class="cursor-pointer"> {{ option.label }}</span>
            </div>
            <hr class="text-dividerColor" />
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

        <ul
          v-if="isSelect && grid"
          class="mt-10 z-10 w-full grid grid-cols-7 justify-items-center gap-y-2 text-xs absolute overflow-y-scroll top-1 right-0 py-3 shadow-md bg-lightBg shadow-2xl"
        >
          <li
            v-for="option in options"
            :key="option"
            class="cursor-pointer text-xs w-6 h-6"
            :class="
              value == option.value
                ? ' bg-secondary rounded-md p-1 shadow-lg text-center text-white'
                : 'text-dark-900 p-1'
            "
          >
            <div class="flex items-center gap-2">
              <span @click="update(option)" class=""> {{ option.label }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div
        v-if="!isSelect && !shrink"
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
      @click="
        () => {
          isSelect = !isSelect;
        }
      "
      :class="!isSelect ? 'pointer-events-none' : ''"
      class="bg-transparent fixed inset-0"
    ></div>
  </main>
</template>

<script>
import { ref, reactive, nextTick, watch, computed } from "vue";

export default {
  emit: ["update", "addNew"],
  props: {
    addOptText: {
      type: String,
      default: "",
    },
    addOpt: {
      type: Boolean,
      default: false,
    },
    value: {
      default: "",
    },
    grid: {
      type: Boolean,
      default: false,
    },
    shrink: {
      type: Boolean,
      default: false,
    },

    autoHeight: {
      type: Boolean,
      default: false,
    },

    error: {
      type: [String, Boolean],
      default: false,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select",
    },
    extraCss: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dropdownStyle: "top-0",
      dropdownStyle2: "top-16",
    };
  },

  setup(props, { emit }) {
    // const emit = defineEmits(["update"]);
    const optionString = ref("");
    // const searchInput = ref(null);

    const searchQuery = ref("");
    const isSelect = ref(false);
    const optionData = ref([]);
    const propOptions = computed(() => props.options);

    optionData.value = propOptions.value;

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
            return x.label
              .toLowerCase()
              .indexOf(searchQuery.value.toLowerCase()) > -1
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
    function getLabelFromValue(value) {
      const mapper =
        props.options &&
        props.options.map((item) => {
          return item.value;
        });
      if (value && mapper && mapper.includes(value)) {
        const label = props.options.filter((item) => {
          return item.value === value;
        });

        return label[0].label;
      }
      return "Select";
    }
    async function update(value) {
      optionString.value = value.value;
      isSelect.value = false;
      emit("update", optionString.value);
    }
    function emitBool() {
      emit("addNew");
    }
    return {
      update,
      getLabelFromValue,
      searchFunction,
      emitBool,
      optionData,
      optionString,
      searchQuery,
      isSelect,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.checkDropdownPosition);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkDropdownPosition);
  },

  methods: {
    checkDropdownPosition() {
      let dropdown = this.$el;
      let windowHeight = window.innerHeight;
      let dropdownRect = dropdown.getBoundingClientRect();
      let dropdownHeight = dropdownRect.height;
      let dropdownTop = dropdownRect.top;
      let dropdownBottom = dropdownRect.bottom;

      if (dropdownTop < 0) {
        this.dropdownStyle = "top-0";
      } else if (dropdownBottom > 300 && dropdownBottom < 400) {
        this.dropdownStyle = "-bottom-2";
        this.dropdownStyle2 = "top-16";
      } else if (dropdownBottom >= 400) {
        this.dropdownStyle = "top-0";
        this.dropdownStyle2 = "bottom-16";
      } else {
        this.dropdownStyle2 = "top-16";
        this.dropdownStyle = "top-0";
      }
    },
  },
};
</script>

<style scoped>
.option-color {
  color: #000000;
  opacity: 0.8;
}
</style>
