<template>
  <div>
    <!-- Matricule Input -->
    <FormInput
      label="Matricule"
      inputId="matricule"
      type="text"
      v-model="apprenantInfo.matricule"
    />

    <!-- Departement Select -->
    <FormSelect
      label="Département"
      :options="departements"
      selectId="departement"
      v-model="apprenantInfo.departementId"
    />
  </div>
</template>

<script setup>
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import { ref, reactive, toRefs } from 'vue';

const apprenantInfo = reactive({
  matricule: '',
  departementId: ''
});

const departements = [
  // { value: 'departement_id', text: 'Departement Name' },
  // Populate this array with departement options
];

defineExpose({ apprenantInfo: toRefs(apprenantInfo) });
</script>