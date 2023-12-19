<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <form @submit.prevent="handleLogin"
            class="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div class="flex items-center justify-center mb-6">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="Your Logo" class="w-12 h-auto mr-4"> <!-- Adjusted with Tailwind classes -->
                <h2 class="text-3xl font-bold text-center">Login</h2>
            </div>
            <FormInput label="Username" inputId="username" type="text" v-model="loginForm.username" />
            <FormInput label="Password" inputId="password" type="password" class="mt-4" v-model="loginForm.password" />
            <FormCheckbox label="Remember me" checkboxId="rememberMe" class="mt-4" v-model="loginForm.rememberMe" />
            <FormButton type="submit" class="mt-6 w-full bg-blue-500 hover:bg-blue-600" :disabled="loading">
                Login
            </FormButton>
            <FormIndicator v-if="loading" message="Logging in..." class="mt-4" />
        </form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormCheckbox from '../formFields/FormCheckbox.vue';
import FormButton from '../formFields/FormButton.vue';
import FormIndicator from './FormIndicator.vue';

const loginForm = ref({
    username: '',
    password: '',
    rememberMe: false
});

const loading = ref(false);

const handleLogin = async () => {
    loading.value = true;

    try {
        // Your login logic here, replace with your actual login code
        // For example: await authService.login(loginForm.value);
        console.log('Login form submitted:', loginForm.value);

        // Simulate login delay
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Reset form or redirect user after successful login
    } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
    } finally {
        loading.value = false;
    }
};
</script>
  
<style>
/* Additional styles if needed */
</style>