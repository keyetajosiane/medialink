<template>
  <div class="discord-toggle-container">
    <label :for="id" class="block text-sm font-medium" :style="{ color: labelColor }">
      <slot>{{ label }}</slot>
    </label>
    <div
      :id="id"
      class="discord-toggle"
      :class="{ 'on': isOn }"
      @click="handleToggle"
      :style="{ backgroundColor: isOn ? onColor : offColor }"
    >
      <div class="discord-slider" :style="{ left: isOn ? 'calc(100% - 18px)' : '1px' }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  onColor: {
    type: String,
    default: '#7289DA'
  },
  offColor: {
    type: String,
    default: '#B9BBBE'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  labelColor: {
    type: String,
    default: '#72767d' // Default color for the label
  }
});

const emit = defineEmits(['update:modelValue']);

const isOn = ref(props.modelValue);

watchEffect(() => {
  isOn.value = props.modelValue;
});

const handleToggle = () => {
  isOn.value = !isOn.value;
  emit('update:modelValue', isOn.value);
};
</script>
<style scoped>
.discord-toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.discord-toggle {
  width: 36px;
  height: 18px;
  border-radius: 9px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
}

.discord-toggle .discord-slider {
  width: 16px;
  height: 16px;
  background-color: #FFF;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  transition: left 0.2s;
}
</style>