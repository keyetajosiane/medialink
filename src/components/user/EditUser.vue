<template>
    <vue-basic-alert ref="alert" :duration="1000" :closeIn="8000" />
    <div class="edit-user-account">
        <h1 class="text-2xl font-bold mb-4">Edit User Account</h1>
        <!-- Form to edit user account will go here -->
        <form @submit.prevent="submitForm">
            <!-- Input fields for account information -->
            <div class="w-full">
                <!-- user_name Input -->
                <FormInput label="user_name" inputId="user_name" type="text" v-model="editUserInfo.user_name" disabled />

                <!-- First Name Input -->
                <FormInput label="First Name" inputId="first_name" type="text" v-model="editUserInfo.first_name" />

                <!-- Last Name Input -->
                <FormInput label="Last Name" inputId="last_name" type="text" v-model="editUserInfo.last_name" />

                <!-- Email Input -->
                <FormInput label="Email" inputId="email" type="email" v-model="editUserInfo.email" />
            </div>

            <div class="">
                <!-- Permissions selection -->
                <PermissionsManager
                    :userPermissions="editUserInfo.permissions" @update="handleUserPermissionsChange" />
            </div>

            <!-- Submit button -->
            <button type="submit">Update Account</button>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted, defineEmits } from 'vue';
import FormInput from '../formFields/FormInput.vue';
import FormSelect from '../formFields/FormSelect.vue';
import PermissionsManager from '../user/PermissionsManager.vue';
import VueBasicAlert from 'vue-basic-alert';
import { initFlowbite } from 'flowbite';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
});

const userStore = useUserStore();

const alert = ref(null);
// Reactive state for the edit user form
const editUserInfo = reactive({
    permissions: [],
});

const emits = defineEmits(['update:editedUser']);

onMounted(async () => {
    initFlowbite();

    if (!props.user) {
        console.error('User ID is required');
        alert.value.showAlert('error', 'User ID is required', "error!!");
        return;
    }

    async function fetchUser() {
        try {
            const url = props.user.role === 'formateur'
                ? `formateur/formateur/${props.user.user_id}/user`
                : props.user.role === 'apprenant'
                    ? `apprenant/apprenant/${props.user.user_id}/user`
                    : `administration_members/administration_members/${props.user.user_id}/user`;
            const response = await axios.get(url);
            // Clear existing properties
            Object.keys(editUserInfo).forEach(key => delete editUserInfo[key]);
    
            // Assign new properties to maintain reactivity
            Object.entries(response.data).forEach(([key, value]) => {
                editUserInfo[key] = value;
            });
            console.log(editUserInfo);
        } catch (error) {
            console.error(`Failed to fetch user: ${error}`);
        }
    }

    await fetchUser();
});

const handleUserPermissionsChange = (newPermissions) => {
  editUserInfo.permissions = newPermissions;
};

const submitForm = () => {
    // Logic to submit the form
    console.log('Form submitted', editUserInfo);
};
</script>

<style scoped>
/* Add styles for edit user account component */
</style>
