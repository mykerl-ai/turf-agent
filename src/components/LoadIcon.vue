<template>
  <div v-if="!circle" class="linear-activity bg-secondary-pressed">
    <div class="indeterminate"></div>
  </div>
  <div v-else class="w-full text-center">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    circle: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.linear-activity {
  overflow: hidden;
  width: 100%;
  height: 4px;
}

.indeterminate {
  position: relative;
  width: 100%;
  height: 100%;
}

.indeterminate:before {
  content: "";
  position: absolute;
  height: 100%;
  background-color: #fb6538;
  animation: indeterminate_first 1.5s infinite ease-out;
}

.indeterminate:after {
  content: "";
  position: absolute;
  height: 100%;
  background-color: #fd9374;
  animation: indeterminate_second 1.5s infinite ease-in;
}

@keyframes indeterminate_first {
  0% {
    left: -100%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}

@keyframes indeterminate_second {
  0% {
    left: -150%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 10%;
  }
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 100px;
  height: 100px;
  margin: 4px 0;
  border: 2px solid #e4572e;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #e4572e transparent transparent transparent;
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
