<template>
    <form @submit.prevent="onSubmit">
        <!-- Other form fields here -->
        <slot name="extra-fields" :selectedPermissions="selectedPermissions" />

        <!-- Update the button to use FormButton -->
        <FormButton type="submit" color="green">Create Account</FormButton>
    </form>
</template>
  
<script setup>
import { ref } from 'vue';
import FormButton from '../formFields/FormButton.vue';

const selectedPermissions = ref([]);

const onSubmit = () => {
    // Logic to handle form submission
    // This should include handling of selectedPermissions
};

  // Logic to handle other aspects of user creation
</script>