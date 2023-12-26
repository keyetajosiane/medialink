<template>
  <button
    :type="type"
    :class="buttonClasses"
    @click="emitClick"
    :style="buttonStyles"
    :disabled="isDisabled"
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
    default: '#5865F2' // Discord button border color
  },
  hoverColor: {
    type: String,
    default: '#4752C4' // Discord button hover color
  },
  isDisabled: {
    type: Boolean,
    default: false // Disabled state
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
  return 'px-4 py-2 font-medium text-sm rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
});

const emitClick = (event) => {
  if (!props.isDisabled) {
    emits('click', event);
  }
};
</script>

<style scoped>
button {
  border-width: 1px;
  border-style: solid;
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.2s; /* Smooth transitions for interactive states */
  /* Add a subtle shadow to give the button an elevated look */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Hover state: change background color and slightly increase the shadow for a lifted effect */
button:hover:not(:disabled) {
  background-color: var(--hover-color);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
}

/* Active state: create an inset shadow to simulate a pressed effect, and slightly scale down the button */
button:active:not(:disabled) {
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
  transform: scale(0.98); /* Scale down the button to simulate pressing */
}

/* Disabled state: lower the opacity and remove shadow */
button:disabled {
  opacity: 0.5;
  box-shadow: none;
  cursor: not-allowed; /* Change cursor to indicate the button is disabled */
}
</style>