<script setup>
import FormInput from '../components/formFields/FormInput.vue';
import FormCheckbox from '../components/formFields/FormCheckbox.vue';
import FormSelect from '../components/formFields/FormSelect.vue';
import FormButton from '../components/formFields/FormButton.vue';
import FormFileUpload from '../components/formFields/FormFIleUpload.vue';

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

const accept_extensions="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";

const handleFileChange = (e) => {
  file.value = e.target.files[0]
}

</script>

<template>
  <main class="bg-discord-gray p-8 min-h-screen flex flex-col items-center justify-center text-white">
    <h1 class="text-3xl font-bold mb-6">Welcome to CIS Mediatheque</h1>
    <div class="flex flex-col justify-between items-center w-full max-w-md">
      <FormInput label="Username" inputId="username" type="text" />
      <FormCheckbox class="mt-4" label="Remember me" checkboxId="rememberMe" />
      <FormSelect class="mt-4" label="Role" :options="userRoles" selectId="apprenant" modelValue="apprenant" />
      <FormButton class="mt-4 w-full">Login</FormButton>
      <FormFileUpload class="mt-4" label="Upload file" fileInputId="file" @change="handleFileChange" :accept="accept_extensions" />
    </div>
  </main>
</template>

<style scoped>
.bg-discord-gray {
  background-color: #36393f; /* Discord dark gray background */
}

/* Additional styles for your form components if needed */
</style>
