<template>
  <div class="discord-select-container">
    <label :for="selectId" class="discord-select-label">
      <slot>{{ label }}</slot>
    </label>
    <select
      :id="selectId"
      class="discord-select"
      v-model="selected"
      @change="updateSelection"
    >
      <option disabled value="" class="discord-option">{{ defaultOption }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="discord-option"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  selectId: {
    type: String,
    required: true
  },
  defaultOption: {
    type: String,
    default: 'Choose an option'
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    required: true
  },
  labelColor: {
    type: String,
    default: '#72767d'
  },
  backgroundColor: {
    type: String,
    default: '#2C2F33'
  },
  textColor: {
    type: String,
    default: '#FFFFFF'
  },
  optionBackgroundColor: {
    type: String,
    default: '#2C2F33'
  }
});

const emit = defineEmits(['update:modelValue']);

let selected = ref(props.modelValue);

watchEffect(() => {
  selected.value = props.modelValue;
});

const updateSelection = () => {
  emit('update:modelValue', selected.value);
};
</script>

<style scoped>
.discord-select-container {
  display: flex;
  flex-direction: column; /* Stack label and select vertically */
  gap: 4px; /* Adjust the gap as needed */
}

.discord-select-label {
  font-size: 14px;
  color: #72767d; /* Discord's label color */
  cursor: pointer;
}

.discord-select {
  padding: 0.5em 1em;
  background-color: #2C2F33; /* Discord's background color for elements */
  color: #FFFFFF; /* Text color for contrast */
  border: 1px solid #202225; /* Slightly lighter border for contrast */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;

  /* Adjust the focus styles to match Discord's style */
  outline: none;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2); /* subtle shadow for elevation */
}

.discord-select:focus {
  border-color: #7289da; /* Discord's accent color for focus */
}

.discord-option {
  background-color: #2C2F33; /* Option background color */
  color: #FFFFFF; /* Option text color */
}

/* Add additional styles for hover, active, and disabled states as needed */
/* Hover - Slightly change the border color to indicate hover state */
.discord-select:hover {
  border-color: #40444b;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

/* Active - Change the border and background color slightly when the select is active or clicked */
.discord-select:active {
  border-color: #7289da; /* Discord's accent color */
  background-color: #292b2f; /* Slightly lighter than the default background */
}

/* Disabled - When the select is not interactive, change the opacity */
.discord-select:disabled {
  opacity: 0.5;
  cursor: default;
  box-shadow: none;
}

/* Option styles for hover (optional, depending on browser support) */
.discord-select option:hover {
  background-color: #292b2f; /* Slightly lighter for hover effect */
}

/* Add a class for disabled options if you need to style them specifically */
.discord-option:disabled {
  color: #555; /* Lighter color to indicate non-selection */
  background-color: #23272a; /* Dark background for disabled option */
}
</style>