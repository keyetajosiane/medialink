<template>
  <div>
    <!-- Matiere Dispensee Input -->
    <FormInput
      label="Matière Dispensée"
      inputId="matiereDispensee"
      type="text"
      v-model="formateurInfo.matiereDispensee"
    />
  </div>
</template>

<script setup>
import FormInput from '../formFields/FormInput.vue';
import { ref, reactive,toRefs, onMounted } from 'vue';
import axios from 'axios';

const formateurInfo = reactive({
  matiereDispensee: ''
});

defineExpose({ formateurInfo: toRefs(formateurInfo) });
</script>