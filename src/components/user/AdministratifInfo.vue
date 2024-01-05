<template>
  <div>
    <!-- Poste Input -->
    <FormInput
      label="Poste"
      inputId="poste"
      type="text"
      v-model="administratifInfo.poste"
    />
  </div>
</template>

<script setup>
import FormInput from '../formFields/FormInput.vue';
import { ref, reactive, toRefs, watch, defineEmits } from 'vue';

const administratifInfo = reactive({
  poste: ''
});

const emit = defineEmits(['update:baseAccountInfo']);

watch(administratifInfo, () => {
  emit('update:baseAccountInfo', toRefs(administratifInfo));
});
</script>