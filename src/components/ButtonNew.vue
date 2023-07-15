<template>
  <main>
    <button
      class="focus:outline-none relative whitespace-nowrap rounded-xl text-xs bg-primary"
      :class="buttonStyle"
      v-bind="$attrs"
    >
      <slot v-if="!loading" />
      <div v-else :class="loading ? 'opacity-0' : ''" class="flex items-center">
        <slot />
      </div>

      <div
        v-if="loading"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </button>
  </main>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  tile: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: String,
    default: "fill",
  },
  variant: {
    type: String,
    default: "fill",
  },
  size: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "primary",
  },
  rounded: {
    type: String,
    default: "full",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
});

const buttonStyle = computed(() => {
  return [
    sizeStyle.value,
    borderRadius.value,
    textColor.value,
    background.value,
    props.block ? "max-w-full min-w-full w-full" : "",
  ];
});

const background = computed(() => {
  let style = "";
  if (props.variant.toLocaleLowerCase() === "outlined") {
    const border = props.border ? `border-${props.border}` : "border";
    style = `${border} border-${props.color} hover:border-${props.color}-hover hover:text-white`;
  } else if (props.variant.toLocaleLowerCase() === "text") {
    style = ``;
  } else {
    // style = `bg-${props.color} hover:bg-${props.color}-hover`;
    style = `bg-${props.color} hover:bg-${props.color}`;
  }
  return style;
});

const textColor = computed(() => {
  let style;

  if (
    props.variant.toLocaleLowerCase() === "outlined" ||
    props.variant.toLocaleLowerCase() === "text"
  ) {
    style = `text-${props.color} hover:text-white`;
  } else {
    style = `text-white`;
  }
  return style;
});

const loaderColor = computed(() => {
  const colors = {
    primary: "#0A244F",
    secondary: "#E4572E",
    tertiary: "#E57C00",
    info: "#184EA8",
    notice: "#F39C36",
    success: "#189F00",
    error: "#D32F2F",
  };

  const colorsArray = [
    "primary",
    "secondary",
    "tertiary",
    "info",
    "notice",
    "success",
    "error",
  ];

  let color;
  if (
    // props.variant.toLocaleLowerCase() === "outlined" ||
    // props.variant.toLocaleLowerCase() === "text"
    colorsArray.includes(props.color)
  ) {
    color = colors[props.color];
  } else {
    color = `#ffff`;
  }
  return color;
});

const borderRadius = computed(() => {
  let style = "";
  if (!props.tile) {
    style = `rounded-${props.rounded}`;
  }

  return style;
});

const sizeStyle = computed(() => {
  let style = "";
  if (props.size === "small") {
    style = `px-4 py-2 text-sm font-medium`;
  } else if (props.size === "large") {
    style = `px-8 py-4 text-sm font-medium`;
  } else {
    style = `px-6 py-3 text-sm font-medium`;
  }

  console.log(props.size);
  return style;
});
</script>

<style scoped>
.lds-ring {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  margin: 4px 0;
  border: 2px solid v-bind(loaderColor);
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: v-bind(loaderColor) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
