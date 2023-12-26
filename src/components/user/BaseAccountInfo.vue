<template>
    <div class="flex flex-wrap justify-around items-center">
        <div class="max-w-md">
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
        <div class="">
            <!-- Permissions selection -->
            <PermissionsManager :permissionsData="permissionsData" :groupNames="groupNames" :userPermissions="userPermissions" @update="handleUserPermissionsChange" />
        </div>
    </div>
    <slot :accountInfo="accountInfo"></slot>
</template>

<script setup>
import { ref,reactive, toRefs } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import FormCheckbox from '../formFields/FormCheckbox.vue';
import PermissionsManager from '../user/PermissionsManager.vue';

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
const handleUserPermissionsChange = (newPermissions) => {
  userPermissions.value = newPermissions;
  console.log(userPermissions.value);
};

// Export accountInfo so it can be used in the parent component
defineExpose({ accountInfo: toRefs(accountInfo) });
</script>