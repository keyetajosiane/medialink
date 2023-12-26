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
  { value: '1', text: 'TIC' },
  { value: '2', text: 'RSE' },
  { value: '3', text: 'RH' },
  { value: '4', text: 'Gestion' },
  { value: '5', text: 'Finance' }
];

defineExpose({ apprenantInfo: toRefs(apprenantInfo) });
</script>