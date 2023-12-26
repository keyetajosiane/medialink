<template>
    <div class="min-h-screen bg-gray-700 flex justify-center items-center">
        <form @submit.prevent="handleSubmit" class="bg-gray-800 p-8 rounded-lg space-y-4 w-full max-w-md">
            <!-- Base Account Info -->
            <BaseAccountInfo v-slot="{ accountInfo }"> 
                <!-- Conditionally rendered components based on selected role -->
                <FormateurInfo v-if="accountInfo.role === 'formateur'" />
                <ApprenantInfo v-if="accountInfo.role === 'apprenant'" />
                <AdministratifInfo v-if="accountInfo.role === 'membre administratif'" />
            </BaseAccountInfo>


            <!-- Submit Button -->
            <FormButton class="mt-4 w-full" type="submit">
                Create Account
            </FormButton>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseAccountInfo from './BaseAccountInfo.vue';
import FormateurInfo from './FormateurInfo.vue';
import ApprenantInfo from './ApprenantInfo.vue';
import AdministratifInfo from './AdministratifInfo.vue';
import FormButton from '../formFields/FormButton.vue';

const handleSubmit = () => {
    // Implement submission logic here
};
</script>

<style scoped></style>