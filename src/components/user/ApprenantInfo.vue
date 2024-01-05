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
import { ref, reactive, toRefs, onMounted } from 'vue';
import axios from 'axios';

const apprenantInfo = reactive({
  matricule: '',
  departementId: ''
});

const departements = ref([]);

onMounted(() => {
  axios.get('departement/departement/get')
    .then((response) => {
      departements.value = response.data.map(element => ({
        'value': element.departement_id,
        'text': element.nom_departement
      }));
    })
    .catch((error) => {
      console.log(error);
    });
});

defineExpose({ apprenantInfo: toRefs(apprenantInfo) });
</script>