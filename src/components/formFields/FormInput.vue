<template>
  <div class="mb-4">
    <label :for="inputId" class="block text-sm font-medium text-discord-gray">
      {{ label }}
      <input :id="inputId"
        class="mt-1 block w-full rounded-md bg-discord-dark border-discord-border shadow-none placeholder-discord-gray text-white focus:border-discord-blue focus:ring focus:ring-discord-blue focus:ring-opacity-50"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus')"
        @blur="$emit('blur')" :type="type" :placeholder="placeholder" />
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
  inputId: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);
</script>

<style scoped>
.text-discord-gray {
  color: #72767d;
  /* Discord's text color for placeholders and labels */
}

.bg-discord-dark {
  background-color: #2f3136;
  /* Discord's dark theme background color for inputs */
}

.border-discord-border {
  border: 1px solid #202225;
  /* Discord's border color for inputs */
}

.placeholder-discord-gray::placeholder {
  color: #72767d;
  /* Discord's placeholder text color */
}

.text-white {
  color: #ffffff;
  /* For input text color */
}

.focus\:border-discord-blue {
  --tw-border-opacity: 1;
  border-color: rgba(88, 101, 242, var(--tw-border-opacity));
  /* Discord's focus border color */
}

.focus\:ring-discord-blue {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(88, 101, 242, var(--tw-ring-opacity));
  /* Discord's focus ring color */
}</style>