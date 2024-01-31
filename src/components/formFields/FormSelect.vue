<template>
  <div class="flex flex-col mb-4">
    <label :for="selectId" class="block text-sm font-medium text-discord-gray">
      {{ label }}
    </label>
    <select :id="selectId" v-model="selected" @change="updateSelection"
      class="mt-1 block w-full rounded-lg bg-discord-dark border border-discord-border px-3 py-2 text-sm placeholder-discord-gray text-white focus:outline-none focus:border-discord-blue focus:ring focus:ring-discord-blue focus:ring-opacity-50">
      <option disabled :value="null" class="text-gray-400">{{ defaultOption }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" class="text-white">
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