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
            <FormSelect label="Role" :options="accountRoles" selectId="" :modelValue="accountInfo.role" v-model="accountInfo.role" defaultOption="Choose role" />
        </div>
        <div class="">
            <!-- Permissions selection -->
            <PermissionsManager :permissionsData="permissionsData" :groupNames="groupNames" :userPermissions="userPermissions" @update="handleUserPermissionsChange" />
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
    firstName: '',
    lastName: '',
    username: '',
    isAdmin: false,
    permissions: []
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

const permissionsData = ref([]);

const userPermissions = ref([]);

onMounted(() => {
  async function getPermissionsList() {
      try {
          const response = await axios.get('permissions/permission');
          permissionsData.value = response.data.map((permission) => ({
            ...permission,
            group: permission.nom.split('_')[0]
          }));
      } catch (error) {
          console.error(`Failed to fetch permissions: ${error}`);
      }
  }

  getPermissionsList();
});

const handleUserPermissionsChange = (newPermissions) => {
  userPermissions.value = newPermissions;
  accountInfo.permissions = newPermissions;
  console.log(userPermissions.value);
};

const emit = defineEmits(['update:baseAccountInfo']);

watch(accountInfo, () => {
  emit('update:baseAccountInfo', toRefs(accountInfo));
});
</script>