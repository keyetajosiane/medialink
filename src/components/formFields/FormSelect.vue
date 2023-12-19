<template>
  <div class="discord-select-container">
    <label :for="selectId" class="block text-sm font-medium" :style="{ color: labelColor }">
      <slot>{{ label }}</slot>
    </label>
    <select
      :id="selectId"
      class="discord-select"
      v-model="selected"
      @change="updateSelection"
      :style="{ backgroundColor: backgroundColor, color: textColor }"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :style="{ backgroundColor: optionBackgroundColor }"
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
  align-items: center;
  gap: 10px;
}

.discord-select-label {
  font-size: 14px;
  cursor: pointer;
}

.discord-select {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.discord-select option {
  background-color: #2C2F33;
  color: #FFFFFF;
}
</style>