<script setup>
import FormInput from '../components/formFields/FormInput.vue';
import FormCheckbox from '../components/formFields/FormCheckbox.vue';
import FormSelect from '../components/formFields/FormSelect.vue';
import FormButton from '../components/formFields/FormButton.vue';
import FormFileUpload from '../components/formFields/FormFIleUpload.vue';
import PermissionsManager from '../components/user/PermissionsManager.vue';
import { ref } from 'vue';


const userRoles = [
  {
    value: 'apprenant',
    text: 'Apprenant'
  },
  {
    value: 'formateur',
    text: 'Formateur'
  },
  {
    value: 'membre administratif',
    text: 'Membre administratif'
  }
];

const groupNames = {
  'departement': 'Department Permissions',
  'resource': 'Resource Permissions',
  'user': 'User Permissions'
};

const permissionsData = [
  { permissions_id: 10, nom: 'departement_create', group: 'departement' },
  { permissions_id: 11, nom: 'departement_delete', group: 'departement' },
  { permissions_id: 9, nom: 'departement_get', group: 'departement' },
  { permissions_id: 12, nom: 'departement_update', group: 'departement' },
  { permissions_id: 2, nom: 'resource_create', group: 'resource' },
  { permissions_id: 3, nom: 'resource_delete', group: 'resource' },
  { permissions_id: 1, nom: 'resource_read', group: 'resource' },
  { permissions_id: 4, nom: 'resource_update', group: 'resource' },
  { permissions_id: 6, nom: 'user_create', group: 'user' },
  { permissions_id: 8, nom: 'user_delete', group: 'user' },
  { permissions_id: 5, nom: 'user_get', group: 'user' },
  { permissions_id: 7, nom: 'user_update', group: 'user' }
];

const userPermissions = ref([1,12]);

const accept_extensions="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";

const handleUserPermissionsChange = (newPermissions) => {
  userPermissions.value = newPermissions;
  console.log(userPermissions.value);
};

const handleFileChange = (e) => {
  file.value = e.target.files[0]
}

</script>

<template>
  <main class="bg-discord-gray p-8 min-h-screen flex flex-col items-center justify-center text-white">
    <h1 class="text-3xl font-bold mb-6">Welcome to CIS Mediatheque</h1>
    <div class="flex flex-col justify-between items-center w-full">
      <FormInput label="Username" inputId="username" type="text" />
      <FormCheckbox class="mt-4" label="Remember me" checkboxId="rememberMe" />
      <FormSelect class="mt-4" label="Role" :options="userRoles" selectId="apprenant" modelValue="apprenant" />
      <FormButton class="mt-4 w-full">Login</FormButton>
      <FormFileUpload class="mt-4" label="Upload file" fileInputId="file" @change="handleFileChange" :accept="accept_extensions" />
      <PermissionsManager :permissionsData="permissionsData" :groupNames="groupNames" :userPermissions="userPermissions" @update="handleUserPermissionsChange" />
    </div>
  </main>
</template>

<style scoped>
.bg-discord-gray {
  background-color: #36393f; /* Discord dark gray background */
}

/* Additional styles for your form components if needed */
</style>
