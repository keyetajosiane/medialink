<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="min-h-screen bg-gray-700 flex justify-center items-center">
        <form @submit.prevent="handleSubmit" class="bg-gray-800 p-8 rounded-lg space-y-4 w-full">
            <h1 class="text-2xl font-bold text-white leading-tight text-center">Account Creation</h1>
            <!-- Base Account Info -->
            <BaseAccountInfo v-slot="{ accountInfo }">
                <!-- Conditionally rendered components based on selected role -->
                <div class="flex flex-wrap justify-center gap-20 items-center">
                    <div class="max-w-md">
                        <FormateurInfo v-if="accountInfo.role === 'formateur'" />
                        <ApprenantInfo v-if="accountInfo.role === 'apprenant'" />
                        <AdministratifInfo v-if="accountInfo.role === 'membre administratif'" />
                    </div>
                    <!-- Submit Button -->
                    <div class="max-w-md">
                        <FormButton class="mt-4 w-full" type="submit">
                            Create Account
                        </FormButton>
                        <FormIndicator v-if="loading" message="creating account ..." class="mt-4 text-white" />
                    </div>
                </div>
            </BaseAccountInfo>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseAccountInfo from './BaseAccountInfo.vue';
import FormateurInfo from './FormateurInfo.vue';
import ApprenantInfo from './ApprenantInfo.vue';
import AdministratifInfo from './AdministratifInfo.vue';
import FormButton from '../formFields/FormButton.vue';
import FormIndicator from '../forms/FormIndicator.vue';
import VueBasicAlert from 'vue-basic-alert';
import { initFlowbite } from 'flowbite';

const loading = ref(false);
const alert = ref(null);

onMounted(() => {
    initFlowbite();
});

const handleSubmit = () => {
    // Implement submission logic here
    // Simulate account creation
    loading.value = true;

    // Simulate a delay for account creation
    setTimeout(() => {
        loading.value = false;
        alert.value.showAlert('success', 'Account creation successful', "success!!");
    }, 2000);
};
</script>

<style scoped></style>