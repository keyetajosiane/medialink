<template>
    <div class="flex flex-wrap justify-around items-center">
        <div class="max-w-md">
            <!-- user_name Input -->
            <FormInput label="user_name" inputId="user_name" type="text" v-model="accountInfo.user_name" />
    
            <!-- First Name Input -->
            <FormInput label="First Name" inputId="first_name" type="text" v-model="accountInfo.first_name" />
    
            <!-- Last Name Input -->
            <FormInput label="Last Name" inputId="last_name" type="text" v-model="accountInfo.last_name" />
    
            <!-- Email Input -->
            <FormInput label="Email" inputId="email" type="email" v-model="accountInfo.email" />
    
            <!-- Password Input -->
            <FormInput label="Password" inputId="password" type="password" v-model="accountInfo.password" />
    
            <!-- Is Admin Checkbox -->
            <FormCheckbox label="Is Admin?" checkboxId="is_admin" v-model="accountInfo.is_admin" />
    
            <!-- Role Selection -->
            <FormSelect label="Role" :options="accountRoles" selectId="" :modelValue="accountInfo.role" v-model="accountInfo.role" defaultOption="Choose role" />
        </div>
        <div class="">
            <!-- Permissions selection -->
            <PermissionsManager :userPermissions="userPermissions" @update="handleUserPermissionsChange" />
        </div>
    </div>
</template>

<script setup>
import { ref,reactive, toRefs, onMounted, watch, defineEmits } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import FormCheckbox from '../formFields/FormCheckbox.vue';
import PermissionsManager from '../user/PermissionsManager.vue';
import axios from 'axios';

// Define the common account information here
const accountInfo = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    first_name: '',
    last_name: '',
    user_name: '',
    is_admin: false,
    permissions: []
});

const accountRoles = [
    { value: 'formateur', text: 'Formateur' },
    { value: 'apprenant', text: 'Apprenant' },
    { value: 'membre_administratif', text: 'Membre Administratif' }
    // Add other roles as needed
];

const userPermissions = ref([]);

const handleUserPermissionsChange = (newPermissions) => {
  userPermissions.value = newPermissions;
  accountInfo.permissions = newPermissions;
};

const emit = defineEmits(['update:baseAccountInfo']);

watch(accountInfo, () => {
  emit('update:baseAccountInfo', toRefs(accountInfo));
});
</script>