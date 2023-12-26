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
import { ref, reactive, toRefs } from 'vue';

const administratifInfo = reactive({
  poste: ''
});

defineExpose({ administratifInfo: toRefs(administratifInfo) });
</script>