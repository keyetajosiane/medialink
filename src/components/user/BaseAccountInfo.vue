<template>
    <slot :accountInfo="accountInfo"></slot>
    <div>
        <!-- Username Input -->
        <FormInput label="Username" inputId="username" type="text" v-model="accountInfo.username" />

        <!-- First Name Input -->
        <FormInput label="First Name" inputId="firstName" type="text" v-model="accountInfo.firstName" />

        <!-- Last Name Input -->
        <FormInput label="Last Name" inputId="lastName" type="text" v-model="accountInfo.lastName" />

        <!-- Email Input -->
        <FormInput label="Email" inputId="email" type="email" v-model="accountInfo.email" />

        <!-- Password Input -->
        <FormInput label="Password" inputId="password" type="password" v-model="accountInfo.password" />

        <!-- Is Admin Checkbox -->
        <FormCheckbox label="Is Admin?" checkboxId="isAdmin" v-model="accountInfo.isAdmin" />

        <!-- Role Selection -->
        <FormSelect label="Role" :options="accountRoles" selectId="" :modelValue="accountInfo.role" v-model="accountInfo.role" />
    </div>
</template>

<script setup>
import { ref,reactive, toRefs } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import FormCheckbox from '../formFields/FormCheckbox.vue';

// Define the common account information here
const accountInfo = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    firstName: '',
    lastName: '',
    username: '',
    isAdmin: false
});

const accountRoles = [
    { value: 'formateur', text: 'Formateur' },
    { value: 'apprenant', text: 'Apprenant' },
    { value: 'membre administratif', text: 'Membre Administratif' }
    // Add other roles as needed
];

// Export accountInfo so it can be used in the parent component
defineExpose({ accountInfo: toRefs(accountInfo) });
</script>