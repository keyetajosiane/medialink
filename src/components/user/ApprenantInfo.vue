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
      v-model="apprenantInfo.departement_id"
      defaultOption="Choose departement"
    />
  </div>
</template>

<script setup>
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import { ref, reactive, toRefs, onMounted, watch, defineEmits } from 'vue';
import axios from 'axios';

const apprenantInfo = reactive({
  matricule: '',
  departement_id: ''
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

const emit = defineEmits(['update:baseAccountInfo']);

watch(apprenantInfo, () => {
  emit('update:baseAccountInfo', toRefs(apprenantInfo));
});
</script>