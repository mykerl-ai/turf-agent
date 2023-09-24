<template>
  <main>
    <!-- <div :class="[borderClass]" class="relative flex items-center">
      <div
        v-show="
          (isFocused && (label || $attrs.placeholder)) ||
          modelValue ||
          String(modelValue).length ||
          formatAmount
        "
        style="transition: top, font-size, 0.1s ease-in-out"
        class="absolute mt-3 z-10 pointer-events-none"
        :class="`${labelStyle}`"
      >
        <div class="w-full h-full text-sm relative bg-white">
          {{ label ? label : $attrs.placeholder }}
          <span
            v-if="isFocused || modelValue"
            style="width: 110%; z-index: -2; margin-top: -4px"
            class="borderLine absolute top-1/2 -left-1 border-4 border-white"
          ></span>
        </div>
      </div>
    </div> -->
    <!-- <span v-if="label" class="floatingLabel">
    {{ label }}
  </span> -->
    <input
      ref="inputField"
      :class="[
        errorClass,
        emp ? 'py-1' : 'py-3 p-16',
        forSelect ? 'bg-white' : 'inputbg',
      ]"
      :style="emp ? 'height: 38px' : 'height: 48px'"
      style="color: black"
      class="rounded-2xl w-full text-secondary font-medium text-sm leading-2 focus:outline-none border-0 px-4 block appearance-none m-0"
      :value="formatAmount"
      v-bind="$attrs"
      :placeholder="!isFocused ? $attrs.placeholder : ''"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="updateField($event)"
    />

    <div v-if="error" class="text-xs font-medium text-error mt-2 text-left">
      {{ error }}
    </div>
  </main>
</template>
<script>
export default {
  inheritAttrs: false,
  data: () => ({
    isFocused: false,
  }),
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    forSelect: {
      type: Boolean,
      default: false,
    },

    error: {
      type: [String, Boolean],
      default: null,
    },
    format: {
      type: Boolean,
      default: false,
    },
    emp: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },

  computed: {
    formatAmount() {
      if (this.format) {
        let val = this.modelValue;
        val = this.removeAlphabet(val);

        val = parseInt(val);
        val = val.toLocaleString();

        if (val === "NaN") {
          return "";
        } else {
          return `₦${val}`;
        }
      } else {
        return this.modelValue;
      }
    },
    errorClass() {
      if (this.error) {
        return "focus:border-error border-error";
      } else {
        return "focus:border-primary focus:ring-primary border-dark-300";
      }
    },
    borderClass() {
      let style = "";
      if (this.error) {
        style = "border-error";
      }
      if (this.forSelect) {
        if (this.isFocused) {
          style = "border-primary py-0";
        } else {
          style = "border-dark-300 py-0";
        }
      } else {
        if (this.isFocused) {
          style = "border-primary py-3";
        } else {
          style = "border-dark-300 py-3";
        }
      }

      return style;
    },
    labelStyle() {
      let style = [];

      if (this.isFocused) {
        style = " floatingLabel text-sm ";
        style = this.error ? `${style} text-error` : `${style} text-primary`;
        if (this.$slots.append) {
          style = `${style} left-6`;
        }
      } else {
        if (String(this.modelValue).trim() === "") {
          style =
            " first top-1/2 left-7 transform -translate-y-1/2 text-dark-300";
        } else {
          style = this.error
            ? "other floatingLabel text-sm text-error"
            : " other floatingLabel text-sm text-primary";
        }
        if (this.$slots.append) {
          style = `${style} left-6`;
        }
      }

      return style;
    },
  },

  methods: {
    updateField(e) {
      let amount = e.target.value;

      if (this.format) {
        amount = this.removeAlphabet(amount);
        const firstChar = amount.charAt(0);
        if (firstChar === "₦") {
          amount = amount.substring(1);
        }

        if (amount !== null) {
          amount = amount.split(",").join("");
          amount = parseInt(amount);
        }
      }

      this.$emit("update:modelValue", amount);
    },

    removeAlphabet(arg) {
      arg = arg.toString();
      let regex = /[a-zA-Z]/g;
      arg = arg.replace(regex, "");
      this.$emit("update:modelValue", arg === "" ? arg : Number(arg));
      return arg;
    },
  },
};
</script>

<style scoped>
.m-0 {
  margin: 0px !important;
}

.inputbg {
  background: rgba(29, 53, 72, 0.1);
}
</style>
