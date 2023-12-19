<template>
  <button
    :type="type"
    :class="buttonClasses"
    @click="emitClick"
    :style="buttonStyles"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  color: {
    type: String,
    default: '#5865F2' // Discord primary button color
  },
  textColor: {
    type: String,
    default: '#FFFFFF' // Discord button text color
  },
  borderColor: {
    type: String,
    default: '#5865F2' // Discord button border color (same as background color to make it invisible by default)
  },
  hoverColor: {
    type: String,
    default: '#4752C4' // Discord button hover color
  }
});

const emits = defineEmits(['click']);

const buttonStyles = computed(() => ({
  backgroundColor: props.color,
  color: props.textColor,
  borderColor: props.borderColor,
  '--hover-color': props.hoverColor
}));

const buttonClasses = computed(() => {
  // Return the string of classes, including the common classes that all buttons share, following Discord style
  return 'px-4 py-2 font-medium text-sm rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
});

const emitClick = (event) => {
  // Emit the click event to the parent component
  emits('click', event);
};
</script>

<style scoped>
button {
  border-width: 1px;
  border-style: solid;
}
button:hover:not(:disabled) {
  background-color: var(--hover-color);
}
</style>