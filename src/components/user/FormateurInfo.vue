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
import { ref, reactive,toRefs, onMounted, watch, defineEmits } from 'vue';
import axios from 'axios';

const formateurInfo = reactive({
  matiereDispensee: ''
});

const emit = defineEmits(['update:baseAccountInfo']);

watch(formateurInfo, () => {
  emit('update:baseAccountInfo', toRefs(formateurInfo));
});
</script>